// @flow

import { Stream } from './stream.js'

/* :: type Token = { type: string, value: string, position: number } */
/* :: type Ast = Object */

export function parse (tokens /* : Array<Token> */) /* : Ast */ {
  const tokenStream = new Stream(tokens)
  const result = []
  while (!tokenStream.atEnd()) {
    result.push(parseTopLevel(tokenStream))
  }
  return result
}

//
// Top Level Definitions
//
function parseTopLevel (tokenStream /* : Stream<Token> */) {
  const token = tokenStream.peek()
  switch (token.type) {
    case 'keyword':
      switch (token.value) {
        case 'const':
          return parseConstant(tokenStream)
        case 'uniform':
          return parseUniform(tokenStream)
        case 'precision':
          return parsePrecision(tokenStream)
        case 'struct':
          return parseStruct(tokenStream)
        default:
          throw new ParseError('Unexpected keyword: ' + token.value, token)
      }
    case 'pragma':
      return parsePragma(tokenStream)
    case 'identifier':
      return parseFunction(tokenStream)
    default:
      throw new ParseError(`Unexpected token: ${token.type} (${token.value})`, token)
  }
}

function parsePragma (tokenStream) {
  const token = tokenStream.take()
  return { type: token.type, value: token.value }
}

function parsePrecision (tokenStream) {
  tokenStream.take()
  const precision = parseToken(tokenStream, 'identifier').value
  const variableType = parseToken(tokenStream, 'identifier').value
  parseToken(tokenStream, 'semicolon')
  return { type: 'precision', precision: precision, variableType: variableType }
}

function parseFunction (tokenStream) {
  const returnType = parseToken(tokenStream, 'identifier')
  const functionName = parseToken(tokenStream, 'identifier')

  const functionArguments = parseArgumentList(tokenStream, parseArgument)
  const body = parseBlock(tokenStream)

  return {
    type: 'functionDefinition',
    name: functionName.value,
    returnType: returnType.value,
    functionArguments: functionArguments,
    body: body
  }
}

function parseUniform (tokenStream) {
  parseToken(tokenStream, 'keyword', 'uniform')
  const variableType = tokenStream.take().value
  const variableName = tokenStream.take().value
  parseToken(tokenStream, 'semicolon')
  return { type: 'uniform', variableType: variableType, variableName: variableName }
}

function parseConstant (tokenStream) {
  parseToken(tokenStream, 'keyword', 'const')
  const variableType = tokenStream.take().value
  const variableName = tokenStream.take().value
  let expression
  if (consumeIfTokenIs(tokenStream, 'operator', '=')) {
    expression = parseExpression(tokenStream)
  }
  parseToken(tokenStream, 'semicolon')
  return { type: 'constant', variableType: variableType, variableName: variableName, expression: expression }
}

function parseStruct (tokenStream) {
  parseToken(tokenStream, 'keyword', 'struct')
  const name = parseToken(tokenStream, 'identifier').value

  parseToken(tokenStream, 'open_brace')
  const elements = parseListTerminatedBy(tokenStream, 'close_brace', parseStructItem)
  parseToken(tokenStream, 'close_brace')

  parseToken(tokenStream, 'semicolon')

  return { type: 'struct', name: name, elements: elements }
}

//
// Statements and Expressions
//
export function parseStatement (tokenStream /* : Stream<Token> */) /* : Ast */ {
  const token = tokenStream.take()
  if (token.type === 'keyword') {
    switch (token.value) {
      case 'return': {
        const returnValue = parseExpression(tokenStream)
        parseToken(tokenStream, 'semicolon')
        return { type: 'return', value: returnValue }
      }
      case 'break':
        parseToken(tokenStream, 'semicolon')
        return { type: 'break' }
      case 'for':
        return parseForLoop(tokenStream)
      case 'if':
        return parseIf(tokenStream)
      default:
        throw new ParseError(`Syntax Error: Unexpected keyword: ${token.value}`, token)
    }
  }

  tokenStream.goBack()
  const expression = parseExpressionOrDeclaration(tokenStream)
  parseToken(tokenStream, 'semicolon')
  return expression
}

function parseForLoop (tokenStream) {
  parseToken(tokenStream, 'open_paren')
  const initial = parseExpressionOrDeclaration(tokenStream)
  parseToken(tokenStream, 'semicolon')
  const condition = parseExpressionOrDeclaration(tokenStream)
  parseToken(tokenStream, 'semicolon')
  const step = parseExpressionOrDeclaration(tokenStream)
  parseToken(tokenStream, 'close_paren')
  const block = parseBlockOrStatement(tokenStream)
  return { type: 'forLoop', initial, condition, step, block }
}

function parseExpressionOrDeclaration (tokenStream) {
  const token = tokenStream.take()
  if (token.type === 'identifier' && tokenStream.lookAhead((x) => x.type === 'identifier')) {
    const variableType = token.value
    const variableName = tokenStream.take().value
    let expression
    if (consumeIfTokenIs(tokenStream, 'operator', '=')) {
      expression = parseExpression(tokenStream)
    }
    return { type: 'declaration', variableType, variableName, expression }
  }

  tokenStream.goBack()
  return parseExpression(tokenStream)
}

function parseIf (tokenStream) {
  parseToken(tokenStream, 'open_paren')
  const condition = parseExpression(tokenStream)
  parseToken(tokenStream, 'close_paren')
  const then = parseBlockOrStatement(tokenStream)

  let elseBlock = []
  if (tokenStream.lookAhead((x) => x.type === 'keyword' && x.value === 'else')) {
    tokenStream.take()
    elseBlock = parseBlockOrStatement(tokenStream)
  }
  return { type: 'if', condition, then, else: elseBlock }
}

function createBinaryOperatorParser (nextParser, operators) {
  return (tokenStream) => {
    let expression = nextParser(tokenStream)

    while (tokenStream.lookAhead((x) => x.type === 'operator' && operators.includes(x.value))) {
      const operator = tokenStream.take()
      const right = nextParser(tokenStream)
      expression = { type: 'binary', operator: operator.value, left: expression, right: right }
    }

    return expression
  }
}

const BINARY_OPERATORS_BY_PRECEDENCE = [
  ['*', '/'],
  ['+', '-'],
  ['<', '>', '<=', '>='],
  ['==', '!='],
  ['&&'],
  ['^^'],
  ['||'],
  ['=', '+=', '-=', '*=', '/=']]

let parseExpression = parsePostfix
for (const operators of BINARY_OPERATORS_BY_PRECEDENCE) {
  parseExpression = createBinaryOperatorParser(parseExpression, operators)
}

function isPostfixOperator (token) {
  return (token.type === 'operator' && POSTFIX_OPERATORS.includes(token.value)) || token.type === 'open_paren'
}

const POSTFIX_OPERATORS = ['.', '++', '--']

function parsePostfix (tokenStream) {
  let expression = parseSimpleExpression(tokenStream)
  while (tokenStream.lookAhead(isPostfixOperator)) {
    const operator = tokenStream.take()
    if (operator.value === '.') {
      const attribute = parseToken(tokenStream, 'identifier')
      expression = { type: 'attribute', expression: expression, attribute: attribute.value }
    } else if (operator.type === 'open_paren') {
      tokenStream.goBack()
      const argumentList = parseArgumentList(tokenStream, parseExpression)
      expression = { type: 'functionCall', function: expression, arguments: argumentList }
    } else {
      expression = { type: 'unary', operator: operator.value, argument: expression }
    }
  }
  return expression
}

function parseSimpleExpression (tokenStream) {
  const token = tokenStream.take()

  if (token.type === 'number') {
    return { type: token.type, value: token.value }
  } else if (token.type === 'open_paren') {
    const containedExpression = parseExpression(tokenStream)
    parseToken(tokenStream, 'close_paren')
    return containedExpression
  } else if (token.type === 'operator' && token.value === '-') {
    return { type: 'unary', operator: '-', argument: parseExpression(tokenStream) }
  } else if (token.type === 'identifier') {
    return { type: 'identifier', value: token.value }
  }
  throw new ParseError('Unable to parse: ' + token.type + ' ' + token.value, token)
}

function parseBlockOrStatement (tokenStream) {
  if (tokenStream.lookAhead((x) => x.type === 'open_brace')) {
    return parseBlock(tokenStream)
  } else {
    return [parseStatement(tokenStream)]
  }
}

function parseBlock (tokenStream) {
  parseToken(tokenStream, 'open_brace')
  const statements = parseListTerminatedBy(tokenStream, 'close_brace', parseStatement)
  parseToken(tokenStream, 'close_brace')
  return statements
}

function parseArgumentList (tokenStream, parser, open = 'open_paren', close = 'close_paren') {
  parseToken(tokenStream, open)

  if (consumeIfTokenIs(tokenStream, close)) {
    return []
  }

  const result = []
  do {
    result.push(parser(tokenStream))
  } while (consumeIfTokenIs(tokenStream, 'comma'))
  parseToken(tokenStream, close)
  return result
}

function parseListTerminatedBy (tokenStream, terminatorTokenType, parser) {
  const result = []
  while (tokenStream.lookAhead((x) => x.type !== terminatorTokenType)) {
    result.push(parser(tokenStream))
  }
  return result
}

function parseArgument (tokenStream) {
  const type = parseToken(tokenStream, 'identifier').value
  const name = parseToken(tokenStream, 'identifier').value

  return { type, name }
}

function parseStructItem (tokenStream) {
  const type = parseToken(tokenStream, 'identifier').value
  const name = parseToken(tokenStream, 'identifier').value
  parseToken(tokenStream, 'semicolon')

  return { type, name }
}

function parseToken (tokenStream, expectedTokenType, expectedTokenValue) {
  const token = tokenStream.take()
  if (token.type !== expectedTokenType && (!expectedTokenValue || expectedTokenValue === token.value)) {
    throw new ParseError('Unexpected token: ' + token.type + ' > ' + token.value + '. Expected ' + expectedTokenType, token)
  }
  return token
}

function consumeIfTokenIs (tokenStream, expectedTokenType, expectedTokenValue) {
  if (tokenStream.lookAhead((x) => x.type === expectedTokenType && (!expectedTokenValue || expectedTokenValue === x.value))) {
    tokenStream.take()
    return true
  }
  return false
}

export class ParseError extends Error {
  /* :: position: number */
  /* :: token: Token */
  constructor (message /* : string */, token /* : Token */) {
    super(message)
    this.token = token
    this.position = token.position
  }
}

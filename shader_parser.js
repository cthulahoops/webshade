import { Stream } from './stream.js'

import { scan } from './scanner.js'
export { scan }

export function parse (tokens) {
  const tokenStream = new Stream(tokens)
  return parseTopLevel(tokenStream)
}

function parseTopLevel (tokenStream) {
  const token = tokenStream.peek()
  if (token.type === 'keyword' && token.value === 'const') {
    return parseConstant(tokenStream)
  } else if (token.type === 'keyword' && token.value === 'uniform') {
    return parseUniform(tokenStream)
  } else if (token.type === 'identifier') {
    return parseFunction(tokenStream)
  } else if (token.type === 'pragma') {
    return token
  } else if (token.type === 'keyword' && token.value === 'struct') {
    return parseStruct(tokenStream)
  } else if (token.type === 'keyword' && token.value === 'precision') {
    tokenStream.take()
    const precision = parseToken(tokenStream, 'identifier').value
    const variableType = parseToken(tokenStream, 'identifier').value
    return { type: 'precision', precision: precision, variableType: variableType }
  }
  throw Error('Unhandled top level declaration' + token.type + '/' + token.value)
}

function parseFunction (tokenStream) {
  const returnType = parseToken(tokenStream, 'identifier')
  const functionName = parseToken(tokenStream, 'identifier')

  const functionArguments = parseArgumentList(tokenStream, parseArgument)
  const body = parseBlock(tokenStream)

  return {
    type: 'function_definition',
    name: functionName.value,
    returnType: returnType.value,
    functionArguments: functionArguments,
    body: body
  }
}

export function parseStatement (tokenStream) {
  const token = tokenStream.take()
  if (token.type === 'keyword' && token.value === 'return') {
    const returnValue = parseBinaryOperatorExpression(tokenStream)
    parseToken(tokenStream, 'semicolon')
    return { type: 'return', value: returnValue }
  } else if (token.type === 'keyword' && token.value === 'break') {
    return { type: 'break' }
  } else if (token.type === 'keyword' && token.value === 'for') {
    return parseForLoop(tokenStream)
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
  parseBlock(tokenStream)
  return { type: 'forLoop', initial, condition, step }
}

function parseExpressionOrDeclaration (tokenStream) {
  const token = tokenStream.take()
  if (token.type === 'identifier' && tokenStream.lookAhead((x) => x.type === 'identifier')) {
    const variableType = token.value
    const variableName = tokenStream.take().value
    let expression
    if (consumeIfTokenIs(tokenStream, 'operator', '=')) {
      expression = parseBinaryOperatorExpression(tokenStream)
    }
    return { type: 'declaration', variableType, variableName, expression }
  }

  tokenStream.goBack()
  return parseBinaryOperatorExpression(tokenStream)
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
    expression = parseBinaryOperatorExpression(tokenStream)
  }
  parseToken(tokenStream, 'semicolon')
  return { type: 'constant', variableType: variableType, variableName: variableName, expression: expression }
}

function parseStruct (tokenStream) {
  parseToken(tokenStream, 'keyword', 'struct')
  const name = parseToken(tokenStream, 'identifier').value
  const elements = parseArgumentList(tokenStream, parseArgument, 'open_brace', 'close_brace')

  return { type: 'struct', name: name, elements: elements }
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

let parseBinaryOperatorExpression = parsePostfix
for (const operators of BINARY_OPERATORS_BY_PRECEDENCE) {
  parseBinaryOperatorExpression = createBinaryOperatorParser(parseBinaryOperatorExpression, operators)
}

function isPostfixOperator (token) {
  return (token.type === 'operator' && POSTFIX_OPERATORS.includes(token.value)) || token.type === 'open_paren'
}

const POSTFIX_OPERATORS = ['.', '++', '--']

function parsePostfix (tokenStream) {
  let expression = parseExpression(tokenStream)
  while (tokenStream.lookAhead(isPostfixOperator)) {
    const operator = tokenStream.take()
    if (operator.value === '.') {
      const attribute = parseToken(tokenStream, 'identifier')
      expression = { type: 'attribute', expression: expression, attribute: attribute.value }
    } else if (operator.type === 'open_paren') {
      tokenStream.goBack()
      const argumentList = parseArgumentList(tokenStream, parseBinaryOperatorExpression)
      expression = { type: 'functionCall', function: expression, arguments: argumentList }
    } else {
      expression = { type: 'unary', operator: operator.value, argument: expression }
    }
  }
  return expression
}

function parseExpression (tokenStream) {
  const token = tokenStream.take()

  if (token.type === 'number') {
    return token
  } else if (token.type === 'open_paren') {
    const containedExpression = parseBinaryOperatorExpression(tokenStream)
    parseToken(tokenStream, 'close_paren')
    return containedExpression
  } else if (token.type === 'operator' && token.value === '-') {
    return { type: 'unary', operator: '-', argument: parseBinaryOperatorExpression(tokenStream) }
  } else if (token.type === 'identifier') {
    return { type: 'identifier', value: token.value }
  }
  throw Error('Unable to parse: ' + token.type + ' ' + token.value)
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

function parseToken (tokenStream, expectedTokenType, expectedTokenValue) {
  const token = tokenStream.take()
  if (token.type !== expectedTokenType && (!expectedTokenValue || expectedTokenValue === token.value)) {
    throw Error('Unexpected token: ' + token.type + ' > ' + token.value + '. Expected ' + expectedTokenType)
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

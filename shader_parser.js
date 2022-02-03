import { Stream } from './stream.js'

function isDigit (token) {
  return (token >= '0' && token <= '9')
}

function isAlpha (token) {
  return (token >= 'a' && token <= 'z') || (token >= 'A' && token <= 'Z') || token === '_'
}

const KEYWORDS = ['return', 'uniform', 'struct', 'const', 'break', 'precision', 'for', 'while', 'if']
const OPERATORS = ['+', '-', '*', '/', '<', '>', '=', '==', '>=', '<=', '!', '!=', '+=', '-=', '++', '--', '*=', '||', '&&']
const PUNCTUATION = new Map(Object.entries({
  '(': 'open_paren',
  ')': 'close_paren',
  '{': 'open_brace',
  '}': 'close_brace',
  ',': 'comma',
  ';': 'semicolon'
}))

export function scan (string) {
  const characterStream = new Stream(string)
  const result = []

  while (!characterStream.atEnd()) {
    const character = characterStream.take()
    let token
    if (character === ' ' || character === '\n') {
      continue
    } else if (character === '/' && characterStream.nextIs('/')) {
      characterStream.takeWhile((x) => x !== '\n')
      continue
    } else if (character === '/' && characterStream.nextIs('*')) {
      while (!characterStream.atEnd()) {
        characterStream.takeWhile((x) => x !== '*')
        characterStream.take()
        if (characterStream.peek() === '/') {
          characterStream.take()
          break
        }
      }
      continue
    } else if (character === '#') {
      const value = characterStream.takeWhile((x) => x !== '\n').join('')
      token = { type: 'pragma', value: '#' + value }
    } else if (PUNCTUATION.has(character)) {
      token = { type: PUNCTUATION.get(character), value: character }
    } else if (!characterStream.atEnd() && OPERATORS.includes(character + characterStream.peek())) {
      const value = character + characterStream.take()
      token = { type: 'operator', value: value }
    } else if (OPERATORS.includes(character)) {
      token = { type: 'operator', value: character }
    } else if (isDigit(character) || character === '.') {
      characterStream.goBack()
      const number = characterStream.takeWhile((x) => isDigit(x) || x === '.').join('')
      if (number === '.') {
        token = { type: 'operator', value: number }
      } else {
        token = { type: 'number', value: number }
      }
    } else if (isAlpha(character)) {
      characterStream.goBack()
      const value = characterStream.takeWhile((x) => isAlpha(x) || isDigit(x)).join('')
      let type = 'identifier'
      if (KEYWORDS.includes(value)) {
        type = 'keyword'
      }
      token = { type: type, value: value }
    } else {
      throw Error('Unexpected character: ' + character)
    }
    result.push(token)
  }

  return result
}

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

  parseToken(tokenStream, 'open_brace')
  const body = parseListTerminatedBy(tokenStream, 'semicolon', 'close_brace', parseStatement)
  parseToken(tokenStream, 'close_brace')

  return {
    type: 'function_definition',
    name: functionName.value,
    returnType: returnType.value,
    functionArguments: functionArguments,
    body: body
  }
}

function parseStatement (tokenStream) {
  const token = tokenStream.take()
  if (token.type === 'keyword' && token.value === 'return') {
    const returnValue = parseBinaryOperatorExpression(tokenStream)
    return { type: 'return', value: returnValue }
  } else if (token.type === 'identifier' && tokenStream.lookAhead((x) => x.type === 'identifier')) {
    const variableName = tokenStream.take().value
    let expression
    if (consumeIfTokenIs(tokenStream, 'operator', '=')) {
      expression = parseBinaryOperatorExpression(tokenStream)
    }
    return { type: 'declaration', variableType: token.value, variableName: variableName, expression: expression }
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

function parseArgumentList (tokenStream, parser) {
  parseToken(tokenStream, 'open_paren')

  if (consumeIfTokenIs(tokenStream, 'close_paren')) {
    return []
  }

  const result = []
  do {
    result.push(parser(tokenStream))
  } while (consumeIfTokenIs(tokenStream, 'comma'))
  parseToken(tokenStream, 'close_paren')
  return result
}

function parseListTerminatedBy (tokenStream, separatorTokenType, terminatorTokenType, parser) {
  const result = []
  while (tokenStream.lookAhead((x) => x.type !== terminatorTokenType)) {
    result.push(parser(tokenStream))
    parseToken(tokenStream, separatorTokenType)
  }
  return result
}

function parseArgument (tokenStream) {
  const type = parseToken(tokenStream, 'identifier')
  const name = parseToken(tokenStream, 'identifier')

  return { type: 'argument', argumentType: type, name: name }
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

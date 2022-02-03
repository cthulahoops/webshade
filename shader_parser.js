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
  return parseFunction(tokenStream)
}

function parseFunction (tokens) {
  const returnType = parseToken(tokens, 'identifier')
  const functionName = parseToken(tokens, 'identifier')

  const functionArguments = parseArgumentList(tokens, parseArgument)

  parseToken(tokens, 'open_brace')
  const body = parseListTerminatedBy(tokens, 'semicolon', 'close_brace', parseStatement)
  parseToken(tokens, 'close_brace')

  return {
    type: 'function_definition',
    name: functionName.value,
    returnType: returnType.value,
    functionArguments: functionArguments,
    body: body
  }
}

function parseStatement (tokens) {
  const token = tokens.take()
  if (token.type === 'keyword' && token.value === 'return') {
    const returnValue = parseBinaryOperatorExpression(tokens)
    return { type: 'return', value: returnValue }
  } else if (token.type === 'identifier' && tokens.lookAhead((x) => x.type === 'identifier')) {
    const variableName = tokens.take().value
    let expression
    if (consumeIfTokenIs(tokens, 'operator', '=')) {
      expression = parseBinaryOperatorExpression(tokens)
    }
    return { type: 'declaration', variableName: variableName, expression: expression }
  }

  tokens.goBack()
  return parseBinaryOperatorExpression(tokens)
}

function createBinaryOperatorParser (nextParser, operators) {
  return (tokens) => {
    let expression = nextParser(tokens)

    while (tokens.lookAhead((x) => x.type === 'operator' && operators.includes(x.value))) {
      const operator = tokens.take()
      const right = nextParser(tokens)
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

function parsePostfix (tokens) {
  let expression = parseExpression(tokens)
  while (tokens.lookAhead(isPostfixOperator)) {
    const operator = tokens.take()
    if (operator.value === '.') {
      const attribute = parseToken(tokens, 'identifier')
      expression = { type: 'attribute', expression: expression, attribute: attribute.value }
    } else if (operator.type === 'open_paren') {
      tokens.goBack()
      const argumentList = parseArgumentList(tokens, parseBinaryOperatorExpression)
      expression = { type: 'functionCall', function: expression, arguments: argumentList }
    } else {
      expression = { type: 'unary', operator: operator.value, argument: expression }
    }
  }
  return expression
}

function parseExpression (tokens) {
  const token = tokens.take()

  if (token.type === 'number') {
    return token
  } else if (token.type === 'open_paren') {
    const containedExpression = parseBinaryOperatorExpression(tokens)
    parseToken(tokens, 'close_paren')
    return containedExpression
  } else if (token.type === 'operator' && token.value === '-') {
    return { type: 'unary', operator: '-', argument: parseBinaryOperatorExpression(tokens) }
  } else if (token.type === 'identifier') {
    return { type: 'identifier', value: token.value }
  }
  throw Error('Unable to parse: ' + token.type + ' ' + token.value)
}

function parseArgumentList (tokens, parser) {
  parseToken(tokens, 'open_paren')

  if (consumeIfTokenIs(tokens, 'close_paren')) {
    return []
  }

  const result = []
  do {
    result.push(parser(tokens))
  } while (consumeIfTokenIs(tokens, 'comma'))
  parseToken(tokens, 'close_paren')
  return result
}

function parseListTerminatedBy (tokens, separatorTokenType, terminatorTokenType, parser) {
  const result = []
  while (tokens.lookAhead((x) => x.type !== terminatorTokenType)) {
    result.push(parser(tokens))
    parseToken(tokens, separatorTokenType)
  }
  return result
}

function parseArgument (tokens) {
  const type = parseToken(tokens, 'identifier')
  const name = parseToken(tokens, 'identifier')

  return { type: 'argument', argumentType: type, name: name }
}

function parseToken (tokens, expectedTokenType) {
  const token = tokens.take()
  if (token.type !== expectedTokenType) {
    throw Error('Unexpected token: ' + token.type + ' > ' + token.value + '. Expected ' + expectedTokenType)
  }
  return token
}

function consumeIfTokenIs (tokens, expectedTokenType, expectedTokenValue) {
  if (tokens.lookAhead((x) => x.type === expectedTokenType && (!expectedTokenValue || expectedTokenValue === x.value))) {
    tokens.take()
    return true
  }
  return false
}

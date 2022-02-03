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
  parseToken(tokens, 'open_paren')

  let functionArguments = []
  if (!tokens.lookAhead((x) => x.type === 'close_paren')) {
    functionArguments = parseList(tokens, 'comma', parseArgument)
  }

  parseToken(tokens, 'close_paren')
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

let parseBinaryOperatorExpression = parseExpression
for (const operators of BINARY_OPERATORS_BY_PRECEDENCE) {
  parseBinaryOperatorExpression = createBinaryOperatorParser(parseBinaryOperatorExpression, operators)
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

function parseList (tokens, separatorTokenType, parser) {
  const result = []
  result.push(parser(tokens))
  while (tokens.lookAhead((x) => x.type === separatorTokenType)) {
    parseToken(tokens, separatorTokenType)
    result.push(parser(tokens))
  }
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

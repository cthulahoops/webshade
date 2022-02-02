class Stream {
  constructor (items) {
    this.items = items
    this.position = 0
  }

  take () {
    const item = this.peek()
    this.position += 1
    return item
  }

  peek () {
    return this.items[this.position]
  }

  goBack () {
    this.position -= 1
  }

  atEnd () {
    return this.position >= this.items.length
  }

  takeWhile (predicate) {
    const result = []
    while (this.lookAhead(predicate)) {
      result.push(this.take())
    }
    return result
  }

  lookAhead (predicate) {
    return !this.atEnd() && predicate(this.peek())
  }

  nextIs (x) {
    return !this.atEnd() && this.peek() === x
  }

  takeMatching (predicate) {
    const token = this.take()
    if (!predicate(token)) {
      throw ('Unexpected token: ', token)
    }
    return token
  }
}

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
  return parseAssignment(tokenStream)
}

function parseBinaryOperator (nextParser, operators) {
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

function parseAssignment (tokens) {
  let parser = parseExpression
  for (const operators of [
    ['*', '/'],
    ['+', '-'],
    ['<', '>', '<=', '>='],
    ['==', '!='],
    ['&&'],
    ['^^'],
    ['||'],
    ['=', '+=', '-=', '*=', '/=']]) {
    parser = parseBinaryOperator(parser, operators)
  }
  return parser(tokens)
}

function parseExpression (tokens) {
  const token = tokens.take()

  if (token.type === 'number') {
    return token
  } else if (token.type === 'open_paren') {
    const containedExpression = parseAssignment(tokens)
    tokens.takeMatching((x) => x.type === 'close_paren')
    return containedExpression
  } else if (token.type === 'operator' && token.value === '-') {
    return { type: 'unary', operator: '-', argument: parseExpression(tokens) }
  }
  throw Error('Unable to parse: ' + token.type + ' ' + token.value)
}

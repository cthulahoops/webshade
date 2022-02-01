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
    while (!this.atEnd() && predicate(this.peek())) {
      result.push(this.take())
    }
    return result
  }
}

function isDigit (token) {
  return (token >= '0' && token <= '9')
}

function isAlpha (token) {
  return token >= 'a' && token <= 'z'
}

const KEYWORDS = ['return', 'function', 'uniform', 'struct', 'const', 'break', 'precision']
const OPERATORS = ['+', '-', '*', '/', '<', '>']

export function scan (string) {
  const characterStream = new Stream(string)
  const result = []

  while (!characterStream.atEnd()) {
    const character = characterStream.take()
    let token
    if (character === '(') {
      token = { type: 'open_paren', value: '(' }
    } else if (character === ')') {
      token = { type: 'close_paren', value: ')' }
    } else if (character === '{') {
      token = { type: 'open_brace', value: '{' }
    } else if (character === '}') {
      token = { type: 'close_brace', value: '}' }
    } else if (character === ',') {
      token = { type: 'comma', value: ',' }
    } else if (character === ';') {
      token = { type: 'semicolon', value: ';' }
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
    } else if (character === ' ' || character === '\n') {
      continue
    } else {
      throw Error('Unexpected character: ' + character)
    }
    result.push(token)
  }

  return result
}

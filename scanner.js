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

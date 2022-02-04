// @flow
import { Stream } from './stream.js'

/* :: type Token = { type: string, value: string, position: number } */

const KEYWORDS = ['return', 'uniform', 'struct', 'const', 'break', 'precision', 'for', 'while', 'if', 'else']
const OPERATORS = ['+', '-', '*', '/', '<', '>', '=', '==', '>=', '<=', '!', '!=', '+=', '-=', '++', '--', '*=', '||', '&&']
const PUNCTUATION /* : Map<string, string> */ = new Map()
PUNCTUATION.set('(', 'open_paren')
PUNCTUATION.set(')', 'close_paren')
PUNCTUATION.set('{', 'open_brace')
PUNCTUATION.set('}', 'close_brace')
PUNCTUATION.set(',', 'comma')
PUNCTUATION.set(';', 'semicolon')

export function scan (string /* : string */) /* : Array<Token> */ {
  const characterStream = new Stream(string.split(''))
  const result = []

  while (true) {
    const token = parseToken(characterStream)
    if (!token) {
      break
    }
    result.push(token)
  }

  return result
}

function parseToken (characterStream /* : Stream<string> */) /* : Token | void */ {
  while (!characterStream.atEnd()) {
    const position = characterStream.position
    const character = characterStream.take()
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
      return { type: 'pragma', value: '#' + value, position }
    } else if (PUNCTUATION.has(character)) {
      const punctuation = PUNCTUATION.get(character)
      if (!punctuation) {
        throw Error('Punctuation character missing from array, was here a minute ago.')
      }
      return { type: punctuation, value: character, position }
    } else if (!characterStream.atEnd() && OPERATORS.includes(character + characterStream.peek())) {
      const value = character + characterStream.take()
      return { type: 'operator', value: value, position }
    } else if (OPERATORS.includes(character)) {
      return { type: 'operator', value: character, position }
    } else if (isDigit(character) || character === '.') {
      characterStream.goBack()
      const number = characterStream.takeWhile((x) => isDigit(x) || x === '.').join('')
      if (number === '.') {
        return { type: 'operator', value: number, position }
      } else {
        return { type: 'number', value: number, position }
      }
    } else if (isAlpha(character)) {
      characterStream.goBack()
      const value = characterStream.takeWhile((x) => isAlpha(x) || isDigit(x)).join('')
      let type = 'identifier'
      if (KEYWORDS.includes(value)) {
        type = 'keyword'
      }
      return { type: type, value: value, position }
    }
    throw Error('Unexpected character: ' + character)
  }
}

function isDigit (character) {
  return (character >= '0' && character <= '9')
}

function isAlpha (character) {
  return (character >= 'a' && character <= 'z') || (character >= 'A' && character <= 'Z') || character === '_'
}

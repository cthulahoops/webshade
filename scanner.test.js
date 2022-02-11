import { test, expect, describe } from '@jest/globals'
import { scan, tokensToSource } from './scanner.js'

describe('scan', () => {
  test('empty list is just EOF', () => {
    expect(scan('')).toStrictEqual([{ type: 'EOF', value: '', position: 0, prefixed: '' }])
  })

  test('just a vector', () => {
    const expected = [
      { type: 'identifier', value: 'vec3', position: 0, prefixed: '' },
      { type: 'open_paren', value: '(', position: 4, prefixed: '' },
      { type: 'number', value: '1.0', position: 5, prefixed: '' },
      { type: 'comma', value: ',', position: 8, prefixed: '' },
      { type: 'number', value: '2', position: 10, prefixed: ' ' },
      { type: 'comma', value: ',', position: 11, prefixed: '' },
      { type: 'number', value: '.0', position: 13, prefixed: ' ' },
      { type: 'close_paren', value: ')', position: 15, prefixed: '' },
      { type: 'semicolon', value: ';', position: 16, prefixed: '' },
      { type: 'EOF', value: '', position: 17, prefixed: '' }
    ]
    expect(scan('vec3(1.0, 2, .0);')).toEqual(expected)
  })

  test('a full function', () => {
    const expected = [
      { type: 'identifier', value: 'vec2', position: 0, prefixed: '' },
      { type: 'identifier', value: 'toVec', position: 5, prefixed: ' ' },
      { type: 'open_paren', value: '(', position: 10, prefixed: '' },
      { type: 'identifier', value: 'x', position: 11, prefixed: '' },
      { type: 'comma', value: ',', position: 12, prefixed: '' },
      { type: 'identifier', value: 'y', position: 14, prefixed: ' ' },
      { type: 'close_paren', value: ')', position: 15, prefixed: '' },
      { type: 'open_brace', value: '{', position: 17, prefixed: ' ' },
      { type: 'keyword', value: 'return', position: 21, prefixed: '\n  ' },
      { type: 'identifier', value: 'vec2', position: 28, prefixed: ' ' },
      { type: 'open_paren', value: '(', position: 32, prefixed: '' },
      { type: 'identifier', value: 'x', position: 33, prefixed: '' },
      { type: 'comma', value: ',', position: 34, prefixed: '' },
      { type: 'identifier', value: 'y', position: 36, prefixed: ' ' },
      { type: 'close_paren', value: ')', position: 37, prefixed: '' },
      { type: 'semicolon', value: ';', position: 38, prefixed: '' },
      { type: 'close_brace', value: '}', position: 40, prefixed: '\n' },
      { type: 'EOF', value: '', position: 42, prefixed: '\n' }
    ]
    expect(scan('vec2 toVec(x, y) {\n  return vec2(x, y);\n}\n')).toEqual(expected)
  })

  test('operators', () => {
    const expected = [
      { type: 'open_paren', value: '(', prefixed: '' },
      { type: 'identifier', value: 'x', prefixed: '' },
      { type: 'operator', value: '+', prefixed: '' },
      { type: 'number', value: '2', prefixed: '' },
      { type: 'close_paren', value: ')', prefixed: '' },
      { type: 'operator', value: '*', prefixed: '' },
      { type: 'open_paren', value: '(', prefixed: '' },
      { type: 'number', value: '15', prefixed: '' },
      { type: 'operator', value: '/', prefixed: '' },
      { type: 'number', value: '72', prefixed: '' },
      { type: 'close_paren', value: ')', prefixed: '' },
      { type: 'EOF', value: '', prefixed: '' }
    ]
    const scanned = scan('(x+2)*(15/72)')
    scanned.forEach((x) => delete x.position)
    expect(scanned).toStrictEqual(expected)
  })

  test('dotted', () => {
    const expected = [
      { type: 'identifier', value: 'object', position: 0, prefixed: '' },
      { type: 'operator', value: '.', position: 6, prefixed: '' },
      { type: 'identifier', value: 'distance', position: 7, prefixed: '' },
      { type: 'EOF', value: '', position: 15, prefixed: '' }
    ]
    expect(scan('object.distance')).toStrictEqual(expected)
  })

  test('comments', () => {
    const expected = [
      { type: 'identifier', value: 'x', prefixed: '' },
      { type: 'operator', value: '=', prefixed: ' /* what is /**x**? ***/ /*:)*/ /**/ ' },
      { type: 'operator', value: '-', prefixed: ' ' },
      { type: 'number', value: '192', prefixed: '' },
      { type: 'EOF', value: '', prefixed: ' // A negative number\n' }
    ]
    const scanned = scan('x /* what is /**x**? ***/ /*:)*/ /**/ = -192 // A negative number\n')
    scanned.forEach((x) => delete x.position)
    expect(scanned).toStrictEqual(expected)
  })

  test('multicharacter operators', () => {
    const expected = [
      { type: 'identifier', value: 'x' },
      { type: 'operator', value: '*=' },
      { type: 'operator', value: '-' },
      { type: 'number', value: '.6' },
      { type: 'operator', value: '++' },
      { type: 'operator', value: '>=' },
      { type: 'number', value: '2' },
      { type: 'operator', value: '&&' },
      { type: 'number', value: '8' },
      { type: 'semicolon', value: ';' },
      { type: 'EOF', value: '' }
    ]
    const scanned = scan('x *=-.6++ >= 2 && 8;')
    scanned.forEach((x) => { delete x.position; delete x.prefixed })
    expect(scanned).toStrictEqual(expected)
  })

  test('pragmas', () => {
    const expected = [
      { type: 'pragma', value: '#version 100' },
      { type: 'keyword', value: 'const' },
      { type: 'identifier', value: 'int' },
      { type: 'identifier', value: 'x' },
      { type: 'operator', value: '=' },
      { type: 'number', value: '0' },
      { type: 'semicolon', value: ';' },
      { type: 'EOF', value: '' }
    ]

    const scanned = scan('#version 100\nconst int x = 0;')
    scanned.forEach((x) => { delete x.position; delete x.prefixed })
    expect(scanned).toStrictEqual(expected)
  })
})

describe('scan and recreate', () => {
  test.each([
    'x = 1',
    'x = 1\n',
    'x = 1 /* Otherwise */\n',
    'x // Wow?!\n   ',
    '    x    '
  ])('%s', (sourceCode) => {
    expect(tokensToSource(scan(sourceCode))).toEqual(sourceCode)
  })
})

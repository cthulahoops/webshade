import { test, expect, describe } from '@jest/globals'
import { scan } from './scanner.js'

describe('scan', () => {
  test('empty list is empty', () => {
    expect(scan('')).toStrictEqual([])
  })

  test('just a vector', () => {
    const expected = [
      { type: 'identifier', value: 'vec3', position: 0 },
      { type: 'open_paren', value: '(', position: 4 },
      { type: 'number', value: '1.0', position: 5 },
      { type: 'comma', value: ',', position: 8 },
      { type: 'number', value: '2', position: 10 },
      { type: 'comma', value: ',', position: 11 },
      { type: 'number', value: '.0', position: 13 },
      { type: 'close_paren', value: ')', position: 15 },
      { type: 'semicolon', value: ';', position: 16 }
    ]
    expect(scan('vec3(1.0, 2, .0);')).toEqual(expected)
  })

  test('a full function', () => {
    const expected = [
      { type: 'identifier', value: 'vec2', position: 0 },
      { type: 'identifier', value: 'toVec', position: 5 },
      { type: 'open_paren', value: '(', position: 10 },
      { type: 'identifier', value: 'x', position: 11 },
      { type: 'comma', value: ',', position: 12 },
      { type: 'identifier', value: 'y', position: 14 },
      { type: 'close_paren', value: ')', position: 15 },
      { type: 'open_brace', value: '{', position: 17 },
      { type: 'keyword', value: 'return', position: 21 },
      { type: 'identifier', value: 'vec2', position: 28 },
      { type: 'open_paren', value: '(', position: 32 },
      { type: 'identifier', value: 'x', position: 33 },
      { type: 'comma', value: ',', position: 34 },
      { type: 'identifier', value: 'y', position: 36 },
      { type: 'close_paren', value: ')', position: 37 },
      { type: 'semicolon', value: ';', position: 38 },
      { type: 'close_brace', value: '}', position: 40 }
    ]
    expect(scan('vec2 toVec(x, y) {\n  return vec2(x, y);\n}\n')).toEqual(expected)
  })

  test('operators', () => {
    const expected = [
      { type: 'open_paren', value: '(' },
      { type: 'identifier', value: 'x' },
      { type: 'operator', value: '+' },
      { type: 'number', value: '2' },
      { type: 'close_paren', value: ')' },
      { type: 'operator', value: '*' },
      { type: 'open_paren', value: '(' },
      { type: 'number', value: '15' },
      { type: 'operator', value: '/' },
      { type: 'number', value: '72' },
      { type: 'close_paren', value: ')' }
    ]
    const scanned = scan('(x+2)*(15/72)')
    scanned.forEach((x) => delete x.position)
    expect(scanned).toStrictEqual(expected)
  })

  test('dotted', () => {
    const expected = [
      { type: 'identifier', value: 'object', position: 0 },
      { type: 'operator', value: '.', position: 6 },
      { type: 'identifier', value: 'distance', position: 7 }
    ]
    expect(scan('object.distance')).toStrictEqual(expected)
  })

  test('comments', () => {
    const expected = [
      { type: 'identifier', value: 'x' },
      { type: 'operator', value: '=' },
      { type: 'operator', value: '-' },
      { type: 'number', value: '192' }
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
      { type: 'semicolon', value: ';' }
    ]
    const scanned = scan('x *=-.6++ >= 2 && 8;')
    scanned.forEach((x) => delete x.position)
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
      { type: 'semicolon', value: ';' }
    ]

    const scanned = scan('#version 100\nconst int x = 0;')
    scanned.forEach((x) => delete x.position)
    expect(scanned).toStrictEqual(expected)
  })
})

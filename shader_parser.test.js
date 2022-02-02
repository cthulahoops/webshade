import { test, expect, describe } from '@jest/globals'

import { parse, scan } from './shader_parser.js'

describe('shader_parser.scan', () => {
  test('empty list is empty', () => {
    expect(scan('')).toStrictEqual([])
  })

  test('just a vector', () => {
    const expected = [
      { type: 'identifier', value: 'vec3' },
      { type: 'open_paren', value: '(' },
      { type: 'number', value: '1.0' },
      { type: 'comma', value: ',' },
      { type: 'number', value: '2' },
      { type: 'comma', value: ',' },
      { type: 'number', value: '.0' },
      { type: 'close_paren', value: ')' },
      { type: 'semicolon', value: ';' }
    ]
    expect(scan('vec3(1.0, 2, .0);')).toStrictEqual(expected)
  })

  test('a full function', () => {
    const expected = [
      { type: 'identifier', value: 'vec2' },
      { type: 'identifier', value: 'toVec' },
      { type: 'open_paren', value: '(' },
      { type: 'identifier', value: 'x' },
      { type: 'comma', value: ',' },
      { type: 'identifier', value: 'y' },
      { type: 'close_paren', value: ')' },
      { type: 'open_brace', value: '{' },
      { type: 'keyword', value: 'return' },
      { type: 'identifier', value: 'vec2' },
      { type: 'open_paren', value: '(' },
      { type: 'identifier', value: 'x' },
      { type: 'comma', value: ',' },
      { type: 'identifier', value: 'y' },
      { type: 'close_paren', value: ')' },
      { type: 'semicolon', value: ';' },
      { type: 'close_brace', value: '}' }
    ]
    expect(scan('vec2 toVec(x, y) {\n  return vec2(x, y);\n}\n')).toStrictEqual(expected)
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
    expect(scan('(x+2)*(15/72)')).toStrictEqual(expected)
  })

  test('dotted', () => {
    const expected = [
      { type: 'identifier', value: 'object' },
      { type: 'operator', value: '.' },
      { type: 'identifier', value: 'distance' }
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
    expect(scan('x /* what is /**x**? ***/ /*:)*/ /**/ = -192 // A negative number\n')).toStrictEqual(expected)
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
    expect(scan('x *=-.6++ >= 2 && 8;')).toStrictEqual(expected)
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
    expect(scan('#version 100\nconst int x = 0;')).toStrictEqual(expected)
  })
})

describe('shader_parser.parse', () => {
  test.each([
    { source: '181.2', expected: { type: 'number', value: '181.2' } },
    { source: '(-7.2)', expected: { type: 'unary', operator: '-', argument: { type: 'number', value: '7.2' } } },
    { source: '3 * 5', expected: { type: 'binary', operator: '*', left: { type: 'number', value: '3' }, right: { type: 'number', value: '5' } } },
    {
      source: '1 * 3 * 5',
      expected: {
        type: 'binary',
        operator: '*',
        left: {
          type: 'binary',
          operator: '*',
          left: { type: 'number', value: '1' },
          right: { type: 'number', value: '3' }
        },
        right: { type: 'number', value: '5' }
      }
    },
    {
      source: '1 + 3 * 5',
      expected: {
        type: 'binary',
        operator: '+',
        left: { type: 'number', value: '1' },
        right: { type: 'binary', operator: '*', left: { type: 'number', value: '3' }, right: { type: 'number', value: '5' } }
      }
    }
  ])('.parse($source)', ({ source, expected }) => {
    expect(parse(scan(source))).toStrictEqual(expected)
  })
})

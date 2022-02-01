import { test, expect } from '@jest/globals'

import { scan } from './shader_parser.js'

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
    { type: 'keyword', value: 'function' },
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
  expect(scan('function(x, y) {\n  return vec2(x, y);\n}\n')).toStrictEqual(expected)
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

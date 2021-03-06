import { test, expect, describe } from '@jest/globals'

import { Stream } from './stream.js'
import { scan } from './scanner.js'
import { parse, parseStatement } from './shader_parser.js'

describe('shader_parser.parse-expression', () => {
  test.each([
    { source: '181.2', expected: { type: 'number', value: '181.2' } },
    { source: 'x', expected: { type: 'identifier', value: 'x' } },
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
    },
    {
      source: '4 + 5 <= 6 * 4',
      expected: {
        type: 'binary',
        operator: '<=',
        left: { type: 'binary', operator: '+', left: { type: 'number', value: '4' }, right: { type: 'number', value: '5' } },
        right: { type: 'binary', operator: '*', left: { type: 'number', value: '6' }, right: { type: 'number', value: '4' } }
      }
    },
    {
      source: 'x++',
      expected: {
        type: 'unary',
        operator: '++',
        argument: { type: 'identifier', value: 'x' }
      }
    },
    {
      source: 'x++',
      expected: {
        type: 'unary',
        operator: '++',
        argument: { type: 'identifier', value: 'x' }
      }
    },
    {
      source: 'x+++++y',
      expected:
      {
        type: 'binary',
        operator: '+',
        left: {
          type: 'unary',
          operator: '++',
          argument: {
            type: 'unary',
            operator: '++',
            argument: { type: 'identifier', value: 'x' }
          }
        },
        right: { type: 'identifier', value: 'y' }
      }
    },
    {
      source: 'x.y',
      expected: { type: 'attribute', expression: { type: 'identifier', value: 'x' }, attribute: 'y' }
    },
    {
      source: 'vec3(x, y, z)',
      expected: {
        type: 'functionCall',
        function: { type: 'identifier', value: 'vec3' },
        arguments: [{ type: 'identifier', value: 'x' }, { type: 'identifier', value: 'y' }, { type: 'identifier', value: 'z' }]
      }
    },
    {
      source: '-sin(x)',
      expected: {
        type: 'unary',
        operator: '-',
        argument: { type: 'functionCall', function: { type: 'identifier', value: 'sin' }, arguments: [{ type: 'identifier', value: 'x' }] }
      }
    }
  ])('.parse($source)', ({ source, expected }) => {
    const fullSource = source + ';'
    const parsed = parseStatement(new Stream(scan(fullSource)))
    expect(parsed).toStrictEqual(expected)
  })
})

describe('shader_parser.parse-function_definition', () =>
  test.each([
    {
      source: 'void main() { y = 7; }',
      functionName: 'main',
      returnType: 'void'
    },
    {
      source: 'int square(int x) { return x * x; }',
      functionName: 'square',
      returnType: 'int'
    },
    {
      source: 'int quad(int a, int b, int c, int x) {\n y = a * x * x;\n y += b * x;\n y += c;\n return c; }',
      functionName: 'quad',
      returnType: 'int'
    },
    {
      source: 'void nothing() {}',
      functionName: 'nothing',
      returnType: 'void',
      body: []
    },
    {
      source: 'void declare() { int i; int j = 2; }',
      functionName: 'declare',
      returnType: 'void',
      body: [{ type: 'declaration', variableType: 'int', variableName: 'i' }, { type: 'declaration', variableType: 'int', variableName: 'j', expression: { type: 'number', value: '2' } }]
    }
  ])('shader_parser.parse($source)', ({ source, functionName, returnType, body }) => {
    const parsed = parse(scan(source))[0]
    expect(parsed.name).toEqual(functionName)
    expect(parsed.returnType).toEqual(returnType)
    if (body) {
      expect(parsed.body).toEqual(body)
    }
  })
)

test('const declaration', () => {
  const source = 'const vec3 color = vec3(1, 0, 0);'
  const parsed = parse(scan(source))[0]
  expect(parsed.type).toEqual('constant')
  expect(parsed.variableType).toStrictEqual('vec3')
  expect(parsed.variableName).toStrictEqual('color')
  expect(parsed.expression.type).toStrictEqual('functionCall')
})

test('uniform declaration', () => {
  const source = 'uniform int thing;'
  const parsed = parse(scan(source))[0]
  expect(parsed.type).toEqual('uniform')
  expect(parsed.variableType).toStrictEqual('int')
  expect(parsed.variableName).toStrictEqual('thing')
})

test('pragma', () => {
  const source = '#version 100\n'
  const parsed = parse(scan(source))[0]

  expect(parsed).toStrictEqual({ type: 'pragma', value: '#version 100' })
})

test('precision', () => {
  const source = 'precision highp float;'
  const parsed = parse(scan(source))[0]

  expect(parsed).toStrictEqual({ type: 'precision', precision: 'highp', variableType: 'float' })
})

test('struct', () => {
  const source = 'struct Thing { int a; int b; };'
  const parsed = parse(scan(source))[0]
  expect(parsed).toStrictEqual({ type: 'struct', name: 'Thing', elements: [{ type: 'int', name: 'a' }, { type: 'int', name: 'b' }] })
})

describe('parse_statements', () => {
  test.each([
    { source: 'break;', expected: { type: 'break' } },
    {
      source: 'if (x > 3) { 7; }',
      expected: {
        type: 'if',
        condition: { type: 'binary', operator: '>', left: { type: 'identifier', value: 'x' }, right: { type: 'number', value: '3' } },
        then: [{ type: 'number', value: '7' }],
        else: []
      }
    },
    {
      source: 'if (x > 3) 7;',
      expected: {
        type: 'if',
        condition: { type: 'binary', operator: '>', left: { type: 'identifier', value: 'x' }, right: { type: 'number', value: '3' } },
        then: [{ type: 'number', value: '7' }],
        else: []
      }
    },
    {
      source: 'if (x > 3) { 7; } else {8;}',
      expected: {
        type: 'if',
        condition: { type: 'binary', operator: '>', left: { type: 'identifier', value: 'x' }, right: { type: 'number', value: '3' } },
        then: [{ type: 'number', value: '7' }],
        else: [{ type: 'number', value: '8' }]
      }
    },
    {
      source: 'for (int c = 0; c < 7; c++) {\n y; }',
      expected: {
        type: 'forLoop',
        initial: { expression: { type: 'number', value: '0' }, type: 'declaration', variableName: 'c', variableType: 'int' },
        condition: { left: { type: 'identifier', value: 'c' }, operator: '<', right: { type: 'number', value: '7' }, type: 'binary' },
        step: { argument: { type: 'identifier', value: 'c' }, operator: '++', type: 'unary' },
        block: [{ type: 'identifier', value: 'y' }]
      }
    }

  ])('parse-statement($source)', ({ source, expected }) => {
    const parsed = parseStatement(new Stream(scan(source)))
    expect(parsed).toStrictEqual(expected)
  })
})

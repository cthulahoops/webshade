import { test, expect } from '@jest/globals'

import { SourceFile } from './source.js'

test.each([
  [0, { line: 0, column: 0 }],
  [4, { line: 0, column: 4 }],
  [8, { line: 0, column: 8 }],
  [11, { line: 1, column: 2 }]
])('getLocation:%s', (position, result) => {
  const sourceFile = new SourceFile('print(i)\nprint(j)\n')

  expect(sourceFile.getLocation(position)).toStrictEqual(result)
})

test.each([
  [0, '# First'],
  [1, '# Second'],
  [2, '# Third']
])('getLine:%s', (position, result) => {
  const sourceFile = new SourceFile('# First\n# Second\n# Third')

  expect(sourceFile.getLine(position)).toEqual(result)
})

test('Out of range line fetch should throw.', () => {
  const sourceFile = new SourceFile('# First\n# Second\n# Third')

  expect(() => sourceFile.getLine(-1)).toThrow()
  expect(() => sourceFile.getLine(3)).toThrow()
  expect(() => sourceFile.getLine(7)).toThrow()
})

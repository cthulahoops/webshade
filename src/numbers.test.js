import { test, expect } from '@jest/globals'
import { sliderRange, formatLike } from './numbers.js'

test.each([
  ['0', { min: '0', max: '0', step: '0' }],
  ['3.4', { min: '1.0', max: '9.9', step: '0.1' }],
  ['0.8', { min: '0.1', max: '0.9', step: '0.1' }],
  ['0.0005', { min: '0.0001', max: '0.0009', step: '0.0001' }],
  ['400', { min: '100', max: '999', step: '001' }],
  ['21.', { min: '10.', max: '99.', step: '01' }]
])('sliderRange-%s', (number, range) => {
  expect(sliderRange(number)).toEqual(range)
})

test.each([
  [3.4, '7.80', '3.40'],
  [3.4, '255', '3'],
  [3.4, '7.5', '3.4'],
  [3.411, '73.80', '3.41'],
  [3.2, '0.', '3.']
])('formatLike-%s-%s', (value, example, result) => {
  expect(formatLike(value, example)).toEqual(result)
})

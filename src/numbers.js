export function sliderRange (number) {
  const [leading, significant] = splitSignificantDigits(number)
  const max = leading + significant.replaceAll(/[0-9]/g, '9')
  const min = leading + significant.replaceAll(/[0-9]/g, '0').replace('0', '1')
  const step = leading + significant.replaceAll(/[0-9]/g, '0').replace(/0\.?$/, '1')
  return { min: min, max: max, step: step }
}

export function formatLike (input, example) {
  const dotLocation = example.indexOf('.')
  if (dotLocation < 0) {
    return input.toFixed(0)
  } else {
    const places = example.length - dotLocation - 1
    if (places === 0) {
      return input.toFixed(places) + '.'
    }
    return input.toFixed(places)
  }
}

function splitSignificantDigits (number) {
  const position = number.search(/[^0.]/)
  if (position >= 0) {
    return [number.substr(0, position), number.substr(position, number.length)]
  }
  return [number, '']
}

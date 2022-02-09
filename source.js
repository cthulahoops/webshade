// @flow

export class SourceFile {
  /* :: sourceText : string */
  /* :: lineStarts : Array<number> */
  constructor (sourceText /* : string */) {
    this.sourceText = sourceText
    this.lineStarts = lineStarts(sourceText)
  }

  lineNumber (position /* : number */) /* : number */ {
    return bisectLines(this.lineStarts, position)
  }

  getLocation (position /* : number */) /* : { line: number, column: number } */ {
    const lineNumber = this.lineNumber(position)
    return { line: lineNumber, column: position - this.lineStarts[lineNumber] }
  }

  getTotalLines () /* : number */ {
    return this.lineStarts.length
  }

  getLine (lineNumber /* : number */) /* : string */ {
    if (lineNumber === this.lineStarts.length - 1) {
      return this.sourceText.substr(this.lineStarts[lineNumber])
    }
    if (lineNumber >= this.lineStarts.length || lineNumber < 0) {
      throw Error('Line number out of range.')
    }

    return this.sourceText.substr(this.lineStarts[lineNumber], this.lineStarts[lineNumber + 1] - this.lineStarts[lineNumber] - 1)
  }
}

function bisectLines (starts, position) {
  if (position < 0) {
    throw Error('Position cannot be negative.')
  }
  let low = 0
  let high = starts.length - 1
  let idx

  do {
    idx = low + Math.floor((high - low) / 2)
    if (starts[idx] <= position && (starts[idx + 1] > position || idx === starts.length - 1)) {
      return idx
    } else if (starts[idx] > position) {
      high = idx - 1
    } else {
      low = idx + 1
    }
  } while (high >= low)

  throw Error('Bisection failed to converge somehow?')
}

function lineStarts (inputString) {
  const result = [0]
  while (true) {
    const index = inputString.indexOf('\n', result[result.length - 1])
    if (index === -1) {
      break
    }
    result.push(index + 1)
  }
  return result
}

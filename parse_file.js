import { readFile } from 'fs/promises'
import { scan } from './scanner.js'
import { parse, ParseError } from './shader_parser.js'
import { SourceFile } from './source.js'

const source = await readFile(process.argv[2], 'utf-8')

const ANSI_RED = "\x1b[1;31m"
const ANSI_RESET = "\x1b[0m"

try {
  console.log(parse(scan(source)))
} catch (error) {
  if (error instanceof ParseError) {
    const sourceFile = new SourceFile(source)
    const errorLocation = sourceFile.getLocation(error.position)
    console.log( `${ errorLocation.line + 1 }:${ errorLocation.column } ${ error.message }` )
    for (let i = Math.max(errorLocation.line - 2, 0); i <= Math.min(errorLocation.line + 2, sourceFile.getTotalLines() - 1); i++) {
      console.log( sourceFile.getLine( i ) )
      if (i === 0) {
        console.log(" ".repeat(errorLocation.column) + ANSI_RED + "^".repeat(error.token.value.length) + ANSI_RESET)
      }
    }
  }
  else {
    console.log(error)
  }
}

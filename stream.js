// @flow

export class Stream /* :: <T> */ {
  /* :: items: Array<T> */
  /* :: position: number */
  constructor (items /* : Array<T> */) {
    this.items = items
    this.position = 0
  }

  take () /* : T */ {
    const item = this.peek()
    this.position += 1
    return item
  }

  peek () /* : T */ {
    return this.items[this.position]
  }

  goBack () {
    this.position -= 1
  }

  atEnd () /* : boolean */ {
    return this.position >= this.items.length
  }

  takeWhile (predicate /* : T => boolean */) /* : Array<T> */ {
    const result = []
    while (this.lookAhead(predicate)) {
      result.push(this.take())
    }
    return result
  }

  lookAhead (predicate /* : T => boolean */) /* : boolean */ {
    return !this.atEnd() && predicate(this.peek())
  }

  nextIs (x /* : T */) /* : boolean */ {
    return !this.atEnd() && this.peek() === x
  }
}

class Stream {
  constructor (items) {
    this.items = items
    this.position = 0
  }

  take () {
    const item = this.peek()
    this.position += 1
    return item
  }

  peek () {
    return this.items[this.position]
  }

  goBack () {
    this.position -= 1
  }

  atEnd () {
    return this.position >= this.items.length
  }

  takeWhile (predicate) {
    const result = []
    while (this.lookAhead(predicate)) {
      result.push(this.take())
    }
    return result
  }

  lookAhead (predicate) {
    return !this.atEnd() && predicate(this.peek())
  }

  nextIs (x) {
    return !this.atEnd() && this.peek() === x
  }
}

export { Stream }

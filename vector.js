// @flow

export class Vector {
  /* :: x : number */
  /* :: y : number */
  /* :: z : number */
  constructor (x /* : number */, y /* : number */, z /* : number */) {
    this.x = x
    this.y = y
    this.z = z
  }

  add (other /* : Vector */) /* : Vector */ {
    return new Vector(this.x + other.x, this.y + other.y, this.z + other.z)
  }

  subtract (other /* : Vector */) /* : Vector */ {
    return new Vector(this.x - other.x, this.y - other.y, this.z - other.z)
  }

  scale (factor /* : number */) /* : Vector */ {
    return new Vector(factor * this.x, factor * this.y, factor * this.z)
  }

  rotateY (theta /* : number */) /* : Vector */ {
    return new Vector(Math.cos(theta) * this.x - Math.sin(theta) * this.z, this.y, Math.sin(theta) * this.x + Math.cos(theta) * this.z)
  }
}

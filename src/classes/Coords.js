class Coords {

  constructor (x, y) {
    this.x = x
    this.y = y
  }

  get xPx () {
    return this.x + 'px'
  }

  get yPx () {
    return this.y + 'px'
  }

}

export default Coords

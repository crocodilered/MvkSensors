class AbstactObject {

  constructor (center, title) {
    // Point of component's center position
    this.center = center
    // Simply title
    this.title = title
    // Class list of compomemnt wrapper (for override)
    this.classList = []
    // Reference to the real DOM-element
    this._elem = null
    // Chaning state handler
    this.onStateChange = function() {}
  }

  render () {
    var elem = document.createElement('div')
    if (this.title) {
      elem.innerHTML = this.title
    }
    this.classList.map(item => elem.classList.add(item))
    return elem
  }

  set elem (elem) {
    this._elem = elem
  }

  get elem () {
    return this._elem
  }

  setErrorState (state) {
    if (this._elem) {
      if (state) {
        this._elem.classList.add('error')
      } else {
        this._elem.classList.remove('error')
      }
      this.onStateChange()
    }
  }

}

export default AbstactObject

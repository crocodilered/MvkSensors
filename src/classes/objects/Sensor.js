import AbstactObject from 'classes/objects/AbstactObject'
import SensorDialog from 'classes/components/SensorDialog'

class Sensor extends AbstactObject {

  constructor (center) {
    super(center)
    this.classList = ['sensor']
    this.outgo = 0
    this.pressure = 0
    this.indicatorElem = null

    this._dialog = null
    this.errors = {}
  }

  render () {
    let elem = super.render()
    this.indicatorElem = elem.appendChild(document.createElement('div'))
    this.indicatorElem.className = 'indicator'

    elem.addEventListener('click', event => { this.mouseClickEventHandler(event) })
    elem.addEventListener('mouseover', event => { this.mouseOverEventHandler(event) })
    elem.addEventListener('mouseout', event => { this.mouseOutEventHandler(event) })

    return elem
  }

  raiseError (errors) {
    this.indicatorElem.classList.remove('norm')
    this.indicatorElem.classList.add('error')
    this.errors = errors
    if (this._dialog) this._dialog.errors = errors
  }

  resetError () {
    this.indicatorElem.classList.remove('error')
    this.indicatorElem.classList.add('norm')
    this.errors = {}
    if (this._dialog) this._dialog.errors = {}
  }

  set data (data) {
    this.outgo = data.outgo
    this.pressure = data.pressure
    if (this._dialog) this._dialog.data = data
    // TODO: calc it
    this.indicatorElem.classList.add('norm')
  }

  get dialog () {
    if (!this._dialog) {
      this._dialog = new SensorDialog(this.elem.getBoundingClientRect())
      this._dialog.data = {outgo: this.outgo, pressure: this.pressure}
      this._dialog.errors = this.errors
    }
    return this._dialog
  }

  mouseClickEventHandler(event) {
    this.dialog.pinned = true
  }

  mouseOverEventHandler(event) {
    if (!this.dialog.shown) this.dialog.show()
  }

  mouseOutEventHandler(event) {
    if (!this.dialog.pinned) this.dialog.hide()
  }

}

export default Sensor

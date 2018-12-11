import ChartModal from 'classes/components/ChartModal'
import OutgoChart from 'classes/charts/OutgoChart'
import PressureChart from 'classes/charts/PressureChart'

class SensorDialog {

  constructor (sensorRect) {
    this.elem = this.render(sensorRect)
    this.shown = false
    this._pinned = false
    this.chartModal = null
  }

  render (sensorRect) {
    const elem = document.body.appendChild(document.createElement('div'))
    elem.className = 'sensor-dialog'
    elem.innerHTML = `
      <div class="sensor-dialog-title">
        <button class="sensor-dialog-button-close"></button>
        <div style="clear: both;"></div>
      </div>
      <div class="sensor-dialog-body">
        <div class="row">
          <div class="label">Расход:</div>
          <div class="value sensor-dialog-outgo-value"></div>
        </div>
        <div class="row">
          <div class="label">Давление:</div>
          <div class="value sensor-dialog-pressure-value"></div>
        </div>
      </div>
      <div class="sensor-dialog-footer">
        <button class="sensor-dialog-button-prefs"></button>
        <button class="sensor-dialog-button-chart"></button>
        <div style="clear: both;"></div>
      </div>
    `
    elem.getElementsByClassName('sensor-dialog-button-close')[0].addEventListener('click', () => { this.hide() })
    elem.getElementsByClassName('sensor-dialog-button-chart')[0].addEventListener('click', () => { this.showChart() })
    elem.style.left = (sensorRect.left - elem.offsetWidth/2 + sensorRect.width/2)  + 'px'
    elem.style.top = (sensorRect.top - elem.offsetHeight - 2) + 'px'
    return elem
  }

  showChart () {
    this.chartModal = this.chartModal || new ChartModal()
    this.chartModal.contentElem.innerHTML = '<div class="highcharts1-wrapper"></div><div class="highcharts2-wrapper"></div>'
    new OutgoChart(this.chartModal.contentElem.getElementsByClassName('highcharts1-wrapper')[0])
    new PressureChart(this.chartModal.contentElem.getElementsByClassName('highcharts2-wrapper')[0])
    this.chartModal.periodPicker.setState({ start: new Date('5/1/2019'), end: new Date('5/8/2019') })
    this.hide()
    this.chartModal.show()
  }

  show () {
    this.elem.style.display = 'block'
    this.shown = true
  }

  hide () {
    this.elem.style.display = 'none'
    this.pinned = false
    this.shown = false
  }

  get pinned () {
    return this._pinned
  }

  set pinned (value) {
    this._pinned = value
    this._pinned
      ? this.elem.classList.add('pinned')
      : this.elem.classList.remove('pinned')
  }

  set data (data) {
    this.elem.getElementsByClassName('sensor-dialog-outgo-value')[0].innerHTML = data.outgo + ' м³'
    this.elem.getElementsByClassName('sensor-dialog-pressure-value')[0].innerHTML = data.pressure + ' атм'
  }

  set errors (errors) {
    errors.outgo
      ? this.elem.getElementsByClassName('sensor-dialog-outgo-value')[0].classList.add('error')
      : this.elem.getElementsByClassName('sensor-dialog-outgo-value')[0].classList.remove('error')
      errors.pressure
      ? this.elem.getElementsByClassName('sensor-dialog-pressure-value')[0].classList.add('error')
      : this.elem.getElementsByClassName('sensor-dialog-pressure-value')[0].classList.remove('error')
  }
}

export default SensorDialog

import Modal from 'classes/components/Modal'
import PeriodPicker from 'classes/components/PeriodPicker'

class ChartModal extends Modal {
  
  constructor () {
    super()
  }

  render () {
    super.render()

    const elem = document.createElement('div')
    elem.className = 'title-inputs'
    elem.innerHTML = `
      <big><span>Период:</span></big>
      <input class="title-inputs-range" placeholder="Период" />
      <div class="title-inputs-picker"></div>
    `
    this.titleElem.insertBefore(elem, this.titleElem.firstChild)
    this.titleElem.removeChild(this.titleElem.getElementsByClassName('title-text')[0])

    const input = this.titleElem.querySelector('.title-inputs-range')
    const container = this.titleElem.querySelector('.title-inputs-picker')
    this.periodPicker = new PeriodPicker(container, input)
  }

}

export default ChartModal

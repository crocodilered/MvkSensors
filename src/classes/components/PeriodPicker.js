import {DateRangePicker} from 'tiny-date-picker/dist/date-range-picker'
import 'tiny-date-picker/tiny-date-picker.css'
import 'tiny-date-picker/date-range-picker.css'

class PeriodPicker {

  constructor (containerElem, inputElem) {
    this.input = inputElem
    this.container = containerElem

    const datePickerOpts = {
      lang: {
        days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      }
    }

    // Inject DateRangePicker into our container
    this.datePicker = DateRangePicker(this.container, { startOpts: datePickerOpts, endOpts: datePickerOpts })
      .on('statechange', (_, rp) => {
        // Update the inputs when the state changes
        const range = rp.state;
        const start = range.start ? range.start.toLocaleDateString() : ''
        const end = range.end ? range.end.toLocaleDateString() : ''
        this.input.value = start + '—' + end
      });

    // When the inputs gain focus, show the date range picker
    this.input.addEventListener('focus', () => { this.show() })

    this.datePicker.on('statechange', (_, picker) => {
      if (picker.state.start && picker.state.end) this.hide()
    })
  }

  setState (state) {
    this.datePicker.setState(state)
  }

  show () {
    this.container.classList.add('title-inputs-picker-visible')
  }

  hide () {
    this.container.classList.remove('title-inputs-picker-visible')
  }

}

export default PeriodPicker

import 'css/components/timewheel.css'

class TimeWheel {

  constructor (elem, pointsCount) {
    this.render(elem, pointsCount)
    this.isPlaying = false
    this.onChangeHandler = () => {}
    this.onErrorHandler = () => {}
    this.onNormHandler = () => {}
    this.timer = null
  }

  render (elem, pointsCount) {
    this.elem = elem.appendChild(document.createElement('div'))
    this.elem.className = 'time-wheel'
    this.elem.innerHTML = `
      <div class="row">
        <div>
          <button class="play-button"></button>
        </div>
        <div><input class="range" type="range" min="1" max="${pointsCount}" value="1"></div>
        <div class="label"></div>
        <div>
          <button class="error-button">Ошибка</button>
          <button class="norm-button">Норм</button>
        </div>
      </div>
    `
    this.labelElem = this.elem.getElementsByClassName('label')[0]

    this.inputElem = this.elem.getElementsByClassName('range')[0]
    this.inputElem.addEventListener('input', () => { this.onChangeHandler(this.inputElem.value) })

    this.playButtonElem = this.elem.getElementsByClassName('play-button')[0]
    this.playButtonElem.addEventListener('click', () => { this.isPlaying ? this.pause() : this.play() })

    this.errorButtonElem = this.elem.getElementsByClassName('error-button')[0]
    this.errorButtonElem.addEventListener('click', () => { this.onErrorHandler() })

    this.normButtonElem = this.elem.getElementsByClassName('norm-button')[0]
    this.normButtonElem.addEventListener('click', () => { this.onNormHandler() })
  }

  play () {
    this.isPlaying = true
    event.target.classList.add('active')
    // Once per *** call onTickHandler
    this.timer = setInterval(() => {
      this.onChangeHandler(this.inputElem.value++)
    }, 1000)
  }

  pause () {
    this.isPlaying = false
    event.target.classList.remove('active')
    clearTimeout(this.timer)
  }

  set label (ts) {
    const date = new Date(ts)

    let h = date.getHours()
    if (h < 10) h = '0' + h

    let i = date.getMinutes()
    if (i < 10) i = '0' + i

    this.labelElem.innerHTML = date.toLocaleDateString() + `${h}:${i}`
  }

}

export default TimeWheel

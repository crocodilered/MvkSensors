import 'css/components/modal.css'

class Modal {

  constructor () {
    this.windowElem = null
    this.overlayElem = null
    this.render ()
  }

  render () {
    let elem

    // Overlay
    elem = document.createElement('div')
    elem.className = 'modal-overlay'
    elem.style.display = 'none'
    this.overlayElem = document.body.appendChild(elem)

    // Content
    elem = document.createElement('div')
    elem.className = 'modal-window'
    elem.style.display = 'none'
    elem.innerHTML = `
      <div class="title">
        <div class="title-text"></div>
        <div class="title-button">&times;</div>
      </div>
      <div class="content"></div>
    `
    this.windowElem = document.body.appendChild(elem)
    this.windowElem.getElementsByClassName('title-button')[0].addEventListener('click', () => { this.hide() })
  }

  show () {
    
    this.windowElem.style.display = 'block'
    this.overlayElem.style.display = 'block'
    const r1 = this.windowElem.getBoundingClientRect()
    const r2 = document.body.getBoundingClientRect()
    this.windowElem.style.top = ((r2.height - r1.height) / 2) + 'px'
  }

  hide () {
    this.windowElem.style.display = 'none'
    this.overlayElem.style.display = 'none'
  }

  set title (title) {
    const elem = this.windowElem.getElementsByClassName('title-text')[0]
    if (elem) {
      this.windowElem.getElementsByClassName('title-text')[0].innerHTML = title
    }
  }

  get titleElem () {
    return this.windowElem.getElementsByClassName('title')[0]
  }

  get contentElem () {
    return this.windowElem.getElementsByClassName('content')[0]
  }

}

export default Modal

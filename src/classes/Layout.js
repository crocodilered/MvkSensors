class Layout {

  constructor (elem) {
    this.elem = elem
    this.canvas = document.createElement('canvas')

    /**
     * Center canvas
     */ 
    this.canvas.style.position = 'absolute'

    // 850 & 400 выбрали опытным путем
    this.canvas.width = 1100
    this.canvas.height = 631
    this.dx = Math.round(this.elem.offsetWidth/2 - this.canvas.width/2)
    this.dy = Math.round(this.elem.offsetHeight/2 - this.canvas.height/2)
    this.canvas.style.left = this.dx + 'px'
    this.canvas.style.top = this.dy + 'px'
    this.elem.appendChild(this.canvas)
    this.draw()
  }

  add (obj) {
    obj.elem = this.elem.appendChild(obj.render())

    const elemLeft = this.elem.offsetLeft + obj.center.x - (obj.elem.offsetWidth / 2)
    const elemTop = this.elem.offsetTop + obj.center.y - (obj.elem.offsetHeight / 2)

    obj.elem.style.left = Math.round(elemLeft) + this.dx + 'px'
    obj.elem.style.top = Math.round(elemTop) + this.dy + 'px'
  }

  /**
   *  Draw all the objects
   */

  // Draw house of 1 section
  drawHouse1 (context, x, y) {
    // House width and height
    const w = 200
    const h = 280
    context.moveTo(x, y + h)
    context.lineTo(x + w, y + h)
    context.lineTo(x + w, y + 30)
    context.lineTo(x + w/2, y)
    context.lineTo(x, y + 30)
    context.lineTo(x, y + h)
  }
  
  // Draw house of 3 sections
  drawHouse3 (context, x, y) {
    // House width and height
    const w = 470
    const h = 280
    context.moveTo(x, y + h)
    context.lineTo(x + w, y + h)
    context.lineTo(x + w, y + 30)
    context.lineTo(x + w/2, y)
    context.lineTo(x, y + 30)
    context.lineTo(x, y + h)
  }

  draw () {
    const c = this.canvas.getContext('2d')

    // Draw Houses
    c.beginPath()
    
    this.drawHouse1(c, 200, 0)
    this.drawHouse1(c, 450, 0)
    this.drawHouse1(c, 700, 0)

    this.drawHouse3(c, 315, 340)

    c.closePath()

    c.lineWidth = 2
    c.strokeStyle = '#b4b4b4'
    c.stroke()

    c.lineWidth = 4
    c.strokeStyle = '#0076ba'

    // Draw solid pipes
    c.beginPath()
    c.moveTo(0, 250)
    c.lineTo(300, 250)
    c.lineTo(300, 310)
    c.lineTo(800, 310)
    c.lineTo(800, 210)

    c.moveTo(550, 310)
    c.lineTo(550, 250)

    c.moveTo(550, 250)
    c.lineTo(550, 210)

    c.moveTo(300, 250)
    c.lineTo(300, 210)
    
    // sens 5
    c.moveTo(405, 310)
    c.lineTo(405, 450)

    // sens 6
    c.moveTo(550, 310)
    c.lineTo(550, 450)

    // sens 7
    c.moveTo(695, 310)
    c.lineTo(695, 450)

    c.stroke()
    c.closePath()

    // Draw dashed pipes
    const lineDash = [4, 4]
    c.setLineDash(lineDash)
    c.beginPath()
    
    // sens 2
    c.moveTo(300, 210)
    c.lineTo(300, 150)
    c.stroke()
    
    // sens 3
    c.moveTo(550, 210)
    c.lineTo(550, 150)
    c.stroke()

    // sens 4
    c.moveTo(800, 210)
    c.lineTo(800, 150)
    c.stroke()

    // sens 5
    c.moveTo(405, 440)
    c.lineTo(405, 490)
    c.stroke()

    // sens 6
    c.moveTo(550, 440)
    c.lineTo(550, 490)
    c.stroke()

    // sens 7
    c.moveTo(695, 440)
    c.lineTo(695, 490)
    c.stroke()

    c.closePath()
    
  }
}

export default Layout

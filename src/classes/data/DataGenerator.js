/**
 *  Генерим данные для куста:
 *    один датчик корневой и два потребителя.
 */

class DataGenerator {
  
  constructor (dateStart, daysCount) {
    this.dateStart = dateStart
    this.daysCount = daysCount

    this.PRESSURE_FLUCTUATION = .02
    this.ROOT_PRESSURE_AVERAGE = 3.7
    this.CHLD_PRESSURE_AVERAGE = 7

    this.ROOT_OUTGO_START = 0
    this.ROOT_OUTGO_INCREASE = 230
    this.ROOT_OUTGO_INCREASE_FLUCTUATION = 10
  }

  sign () {
    return Math.random() < 0.5 ? -1 : 1
  }

  generate (isRoot) {
    let outgo = this.ROOT_OUTGO_INCREASE * (1 + this.ROOT_OUTGO_INCREASE_FLUCTUATION * Math.random())
    outgo = Math.round(outgo)
    
    const pressureAverage = isRoot ? this.ROOT_PRESSURE_AVERAGE : this.CHLD_PRESSURE_AVERAGE

    let pressure = pressureAverage 
      + pressureAverage 
      * this.PRESSURE_FLUCTUATION 
      * Math.random() * this.sign()
    pressure = Math.round(pressure * 10) / 10
    
    return {outgo, pressure}
  }

  get data() {
    const pointsCount = this.daysCount * 24 / 2 // от датчиков значения приходят каждый 2 часа
    
    let ts = []
    let sensor1 = []
    let sensor2 = []
    let sensor3 = []
    let sensor4 = []
    let sensor5 = []
    let sensor6 = []
    let sensor7 = []

    let outgo1 = this.ROOT_OUTGO_START
    let outgo2 = this.ROOT_OUTGO_START
    let outgo3 = this.ROOT_OUTGO_START
    let outgo4 = this.ROOT_OUTGO_START
    let outgo5 = this.ROOT_OUTGO_START
    let outgo6 = this.ROOT_OUTGO_START
    let outgo7 = this.ROOT_OUTGO_START

    for (let i = 0; i < pointsCount; i++) {
      let tick = this.dateStart.getTime() + i * (1000 * 60 * 60 * 2) // + i * 2 часа

      const tickData1 = this.generate(true)
      const tickData2 = this.generate(false)
      const tickData3 = this.generate(false)
      const tickData4 = this.generate(false)
      const tickData5 = this.generate(false)
      const tickData6 = this.generate(false)
      const tickData7 = this.generate(false)

      outgo1 += tickData1.outgo
      outgo2 += tickData2.outgo
      outgo3 += tickData3.outgo
      outgo4 += tickData4.outgo
      outgo5 += tickData5.outgo
      outgo6 += tickData6.outgo
      outgo7 += tickData7.outgo

      const pressure1 = tickData1.pressure
      const pressure2 = tickData2.pressure
      const pressure3 = tickData3.pressure
      const pressure4 = tickData4.pressure
      const pressure5 = tickData5.pressure
      const pressure6 = tickData6.pressure
      const pressure7 = tickData7.pressure

      ts.push(tick)
      sensor1.push({ outgo: outgo1, pressure: pressure1 })
      sensor2.push({ outgo: outgo2, pressure: pressure2 })
      sensor3.push({ outgo: outgo3, pressure: pressure3 })
      sensor4.push({ outgo: outgo4, pressure: pressure4 })
      sensor5.push({ outgo: outgo5, pressure: pressure5 })
      sensor6.push({ outgo: outgo6, pressure: pressure6 })
      sensor7.push({ outgo: outgo7, pressure: pressure7 })
    }

    return { ts, sensor1, sensor2, sensor3, sensor4, sensor5, sensor6, sensor7 }
  }
}

export default DataGenerator

import 'css/main.css'
import 'css/objects.css'

import 'assets/favicon.png'
import 'assets/sensor-bg.png'

import 'assets/sensor-dialog-icons.png'

import Coords from 'classes/Coords'
import Layout from 'classes/Layout'

import Intake from 'classes/objects/Intake'
import Title from 'classes/objects/Title'
import Sensor from 'classes/objects/Sensor'

import DataProvider from 'classes/data/DataProvider'
import TimeWheel from 'classes/components/TimeWheel'

class App {
  constructor () {
    this.layout = new Layout(document.getElementById('container'))
    this.modal = null

    this.errorStatus = 0

    this.intake1 = new Intake(new Coords(100, 250), 'Ввод ХВС из сети<br> МВК 35340')
    this.sensor1 = new Sensor(new Coords(250, 250))
    this.layout.add(this.intake1)
    this.layout.add(this.sensor1)

    this.title2 = new Title(new Coords(300, 50), 'ЦТП абонент 03-07-0923/005<br>Алтуфьевское ш. 24с2')
    this.intake2 = new Intake(new Coords(300, 125), 'Ввод ХВС для ГВС<br> 35340.001<hr> МОЭК')
    this.sensor2 = new Sensor(new Coords(300, 205))
    this.layout.add(this.title2)
    this.layout.add(this.intake2)
    this.layout.add(this.sensor2)
    
    this.title3 = new Title(new Coords(550, 50), 'Жилой дом<br> Алтуфьевское ш. 22А')
    this.intake3 = new Intake(new Coords(550, 125), 'Ввод ХВС<br> 35340.002<hr>ГБУ Жилищник<br> р-на Отрадное')
    this.sensor3 = new Sensor(new Coords(550, 205))
    this.layout.add(this.title3)
    this.layout.add(this.intake3)
    this.layout.add(this.sensor3)

    this.title4 = new Title(new Coords(800, 50), 'Жилой дом<br> Алтуфьевское ш. 26А')
    this.intake4 = new Intake(new Coords(800, 125), 'Ввод ХВС<br> 35340.004<hr>ГБУ Жилищник<br> р-на Отрадное')
    this.sensor4 = new Sensor(new Coords(800, 205))
    this.layout.add(this.title4)
    this.layout.add(this.intake4)
    this.layout.add(this.sensor4)

    this.title5 = new Title(new Coords(550, 390), 'Жилой дом<br> Алтуфьевское ш. 24')
    this.intake5 = new Intake(new Coords(405, 530), 'Ввод ХВС<br> 35340.003<hr>ГБУ Жилищник<br> р-на Отрадное')
    this.sensor5 = new Sensor(new Coords(405, 450))
    this.layout.add(this.title5)
    this.layout.add(this.intake5)
    this.layout.add(this.sensor5)

    this.intake6 = new Intake(new Coords(550, 530), 'Ввод ХВС<br> 35340.005<hr>ГБУ Жилищник<br> р-на Отрадное')
    this.sensor6 = new Sensor(new Coords(550, 450))
    this.layout.add(this.intake6)
    this.layout.add(this.sensor6)

    this.intake7 = new Intake(new Coords(695, 530), 'Ввод ХВС<br> 35340.006<hr>ГБУ Жилищник<br> р-на Отрадное')
    this.sensor7 = new Sensor(new Coords(695, 450))
    this.layout.add(this.intake7)
    this.layout.add(this.sensor7)

    this.dataProvider = new DataProvider(new Date(2018, 8, 1), 60)

    let setSensorsData = (i) => {
      const d = this.dataProvider.data
      this.sensor1.data = d.sensor1[i]
      this.sensor2.data = d.sensor2[i]
      this.sensor3.data = d.sensor3[i]
      this.sensor4.data = d.sensor4[i]
      this.sensor5.data = d.sensor5[i]
      this.sensor6.data = d.sensor6[i]
      this.sensor7.data = d.sensor7[i]
    }

    setSensorsData(0)

    this.timeWheel = new TimeWheel(document.getElementById('container'), 60 * 12) // раз в 2 часа
    this.timeWheel.label = this.dataProvider.data.ts[0]
    this.timeWheel.onChangeHandler = (value) => {
      this.timeWheel.label = this.dataProvider.data.ts[value-1]
      setSensorsData(value)
    }
    this.timeWheel.onErrorHandler = () => {
      this.setErrorStatus(Math.ceil(Math.random() * 6 + 1))
    }
    this.timeWheel.onNormHandler = () => {
      this.setErrorStatus(0)
    }
  }

  setErrorStatus (errorStatus) {
    this.errorStatus = errorStatus
    
    this.sensor1.resetError()
    this.sensor2.resetError()
    this.sensor3.resetError()
    this.sensor4.resetError()
    this.sensor5.resetError()
    this.sensor6.resetError()
    this.sensor7.resetError()

    if (this.errorStatus !== 0) {
      if (this.errorStatus === 1) this.sensor1.raiseError({ outgo: true })
      if (this.errorStatus === 2) this.sensor2.raiseError({ outgo: true })
      if (this.errorStatus === 3) this.sensor3.raiseError({ outgo: true })
      if (this.errorStatus === 4) this.sensor4.raiseError({ outgo: true })
      if (this.errorStatus === 5) this.sensor5.raiseError({ outgo: true })
      if (this.errorStatus === 6) this.sensor6.raiseError({ outgo: true })
      if (this.errorStatus === 7) this.sensor7.raiseError({ outgo: true })
    }
  }

  run () {
    // this.tick ()
  }
}

window.addEventListener('load', () => {
  const app = new App()
  app.run()
})

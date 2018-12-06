import DataGenerator from 'classes/data/DataGenerator'

class DataProvider {

  constructor (dateStart, daysCount) {
    const generator = new DataGenerator(dateStart, daysCount)
    this.data = generator.data
  }

}

export default DataProvider

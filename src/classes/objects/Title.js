import AbstactObject from 'classes/objects/AbstactObject'

class Title extends AbstactObject {

  constructor (center, title) {
    super(center, title)
    this.classList = ['title']
  }

}

 export default Title


const {"v4": uuidv4} = require('uuid');
import { Identifier } from './Identifier'

export class UniqueEntityID extends Identifier<string | number>{
  constructor (id?: string | number) {
    super(id ? id : uuidv4())
  }
}

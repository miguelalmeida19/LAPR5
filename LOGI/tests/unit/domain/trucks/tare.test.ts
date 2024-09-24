import {expect} from "chai";
import {Tare} from "../../../../src/domain/trucks/tare";

describe('Tare Unit Tests',()=>{
  it('create valid tare',()=>{
    const value=300
    const tareResult=Tare.create(value);
    expect(tareResult.isSuccess).to.equal(true);
    expect(tareResult.getValue().value).to.equal(value);
  })

  it('create valid tare with value 0',()=>{
    const value=0
    const tareResult=Tare.create(value);
    expect(tareResult.isSuccess).to.equal(true);
    expect(tareResult.getValue().value).to.equal(value);
  })

  it('fail to create tare with null value', () => {
    const value = null
    const text = Tare.create(value);
    expect(text.isFailure).to.equal(true);
  })

  it('fail to create tare with undefined value', () => {
    const value = undefined
    const text = Tare.create(value);
    expect(text.isFailure).to.equal(true);
  })

  it('fail to create tare with value < 0', () => {
    const value = -10
    const text = Tare.create(value);
    expect(text.isFailure).to.equal(true);
  })

})

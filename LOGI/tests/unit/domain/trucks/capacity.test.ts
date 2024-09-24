import {expect} from "chai";
import {Capacity} from "../../../../src/domain/trucks/capacity";

describe('Capacity Unit Tests',()=>{
  it('create valid capacity',()=>{
    const value=300
    const capacityResult=Capacity.create(value);
    expect(capacityResult.isSuccess).to.equal(true);
    expect(capacityResult.getValue().value).to.equal(value);
  })

  it('create valid capacity with value 0',()=>{
    const value=0
    const capacityResult=Capacity.create(value);
    expect(capacityResult.isSuccess).to.equal(true);
    expect(capacityResult.getValue().value).to.equal(value);
  })

  it('fail to create capacity with null value', () => {
    const value = null
    const text = Capacity.create(value);
    expect(text.isFailure).to.equal(true);
  })

  it('fail to create capacity with undefined value', () => {
    const value = undefined
    const text = Capacity.create(value);
    expect(text.isFailure).to.equal(true);
  })

  it('fail to create capacity with value < 0', () => {
    const value = -10
    const text = Capacity.create(value);
    expect(text.isFailure).to.equal(true);
  })

})

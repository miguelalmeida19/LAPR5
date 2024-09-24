import {expect} from "chai";
import {PathDistance} from "../../../../src/domain/paths/pathDistance";

describe('Distance Unit Tests',()=>{
  it('create valid distance',()=>{
    const value=300
    const distanceResult=PathDistance.create(value);
    expect(distanceResult.isSuccess).to.equal(true);
    expect(distanceResult.getValue().value).to.equal(value);
  })

  it('create valid distance with value 0',()=>{
    const value=0
    const distanceResult=PathDistance.create(value);
    expect(distanceResult.isSuccess).to.equal(true);
    expect(distanceResult.getValue().value).to.equal(value);
  })

  it('fail to create distance with null value', () => {
    const value = null
    const text = PathDistance.create(value);
    expect(text.isFailure).to.equal(true);
  })

  it('fail to create distance with undefined value', () => {
    const value = undefined
    const text = PathDistance.create(value);
    expect(text.isFailure).to.equal(true);
  })

  it('fail to create distance with value < 0', () => {
    const value = -10
    const text = PathDistance.create(value);
    expect(text.isFailure).to.equal(true);
  })

})

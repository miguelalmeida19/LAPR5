import {expect} from "chai";
import {Duration} from "../../../../src/domain/paths/duration";

describe('Duration Unit Tests',()=>{
  it('create valid duration',()=>{
    const value=300
    const durationResult=Duration.create(value);
    expect(durationResult.isSuccess).to.equal(true);
    expect(durationResult.getValue().value).to.equal(value);
  })

  it('create valid duration with value 0',()=>{
    const value=0
    const durationResult=Duration.create(value);
    expect(durationResult.isSuccess).to.equal(true);
    expect(durationResult.getValue().value).to.equal(value);
  })

  it('fail to create duration with null value', () => {
    const value = null
    const text = Duration.create(value);
    expect(text.isFailure).to.equal(true);
  })

  it('fail to create duration with undefined value', () => {
    const value = undefined
    const text = Duration.create(value);
    expect(text.isFailure).to.equal(true);
  })

  it('fail to create duration with value < 0', () => {
    const value = -10
    const text = Duration.create(value);
    expect(text.isFailure).to.equal(true);
  })

})

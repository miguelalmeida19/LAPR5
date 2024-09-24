import {expect} from "chai";
import {Autonomy} from "../../../../src/domain/trucks/autonomy";

describe('Autonomy Unit Tests',()=>{
  it('create valid autonomy',()=>{
    const value=300
    const autonomyResult=Autonomy.create(value);
    expect(autonomyResult.isSuccess).to.equal(true);
    expect(autonomyResult.getValue().value).to.equal(value);
  })

  it('create valid autonomy with value 0',()=>{
    const value=0
    const autonomyResult=Autonomy.create(value);
    expect(autonomyResult.isSuccess).to.equal(true);
    expect(autonomyResult.getValue().value).to.equal(value);
  })

  it('fail to create autonomy with null value', () => {
    const value = null
    const text = Autonomy.create(value);
    expect(text.isFailure).to.equal(true);
  })

  it('fail to create autonomy with undefined value', () => {
    const value = undefined
    const text = Autonomy.create(value);
    expect(text.isFailure).to.equal(true);
  })

  it('fail to create autonomy with value < 0', () => {
    const value = -10
    const text = Autonomy.create(value);
    expect(text.isFailure).to.equal(true);
  })

})

import {expect} from "chai";
import {ConsumedEnergy} from "../../../../src/domain/paths/consumedEnergy";

describe('ConsumedEnergy Unit Tests',()=>{
  it('create valid consumed energy',()=>{
    const value=300
    const consumedEnergyResult=ConsumedEnergy.create(value);
    expect(consumedEnergyResult.isSuccess).to.equal(true);
    expect(consumedEnergyResult.getValue().value).to.equal(value);
  })

  it('create valid consumed energy with value 0',()=>{
    const value=0
    const consumedEnergyResult=ConsumedEnergy.create(value);
    expect(consumedEnergyResult.isSuccess).to.equal(true);
    expect(consumedEnergyResult.getValue().value).to.equal(value);
  })

  it('fail to create consumed energy with null value', () => {
    const value = null
    const text = ConsumedEnergy.create(value);
    expect(text.isFailure).to.equal(true);
  })

  it('fail to create consumed energy with undefined value', () => {
    const value = undefined
    const text = ConsumedEnergy.create(value);
    expect(text.isFailure).to.equal(true);
  })

  it('fail to create consumed energy with value < 0', () => {
    const value = -10
    const text = ConsumedEnergy.create(value);
    expect(text.isFailure).to.equal(true);
  })

})

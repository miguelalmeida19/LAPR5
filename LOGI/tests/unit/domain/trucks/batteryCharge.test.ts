import {expect} from "chai";
import {BatteryCharge} from "../../../../src/domain/trucks/batteryCharge";

describe('BatteryCharge Unit Tests',()=>{
  it('create valid batteryCharge',()=>{
    const value=300
    const batteryChargeResult=BatteryCharge.create(value);
    expect(batteryChargeResult.isSuccess).to.equal(true);
    expect(batteryChargeResult.getValue().value).to.equal(value);
  })

  it('create valid batteryCharge with value 0',()=>{
    const value=0
    const batteryChargeResult=BatteryCharge.create(value);
    expect(batteryChargeResult.isSuccess).to.equal(true);
    expect(batteryChargeResult.getValue().value).to.equal(value);
  })

  it('fail to create batteryCharge with null value', () => {
    const value = null
    const text = BatteryCharge.create(value);
    expect(text.isFailure).to.equal(true);
  })

  it('fail to create batteryCharge with undefined value', () => {
    const value = undefined
    const text = BatteryCharge.create(value);
    expect(text.isFailure).to.equal(true);
  })

  it('fail to create batteryCharge with value < 0', () => {
    const value = -10
    const text = BatteryCharge.create(value);
    expect(text.isFailure).to.equal(true);
  })

})

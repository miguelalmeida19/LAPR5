import {expect} from "chai";
import {RechargeBattery} from "../../../../src/domain/trucks/rechargeBattery";

describe('RechargeBattery Unit Tests',()=>{
  it('create valid rechargeBattery',()=>{
    const value=300
    const rechargeBatteryResult=RechargeBattery.create(value);
    expect(rechargeBatteryResult.isSuccess).to.equal(true);
    expect(rechargeBatteryResult.getValue().value).to.equal(value);
  })

  it('create valid rechargeBattery with value 0',()=>{
    const value=0
    const rechargeBatteryResult=RechargeBattery.create(value);
    expect(rechargeBatteryResult.isSuccess).to.equal(true);
    expect(rechargeBatteryResult.getValue().value).to.equal(value);
  })

  it('fail to create rechargeBattery with null value', () => {
    const value = null
    const text = RechargeBattery.create(value);
    expect(text.isFailure).to.equal(true);
  })

  it('fail to create rechargeBattery with undefined value', () => {
    const value = undefined
    const text = RechargeBattery.create(value);
    expect(text.isFailure).to.equal(true);
  })

  it('fail to create rechargeBattery with value < 0', () => {
    const value = -10
    const text = RechargeBattery.create(value);
    expect(text.isFailure).to.equal(true);
  })

})

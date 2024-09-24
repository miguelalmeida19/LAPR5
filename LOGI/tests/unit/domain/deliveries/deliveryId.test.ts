import {expect} from "chai";
import {DeliveryId} from "../../../../src/domain/deliveries/deliveryId";

describe('DeliveryId Unit Tests',()=>{

  it('success - create deliveryId',()=>{
    const value="123a"
    const result=DeliveryId.create(value);
    expect(result.isSuccess).to.equal(true);
    expect(result.getValue().value).to.equal(value);
  })

  it('fail - null value', () => {
    const value = null
    const result = DeliveryId.create(value);
    expect(result.isFailure).to.equal(true);
  })

  it('fail - undefined value', () => {
    const value = undefined
    const result = DeliveryId.create(value);
    expect(result.isFailure).to.equal(true);
  })

  it('fail - empty value', () => {
    const value = ""
    const result = DeliveryId.create(value);
    expect(result.isFailure).to.equal(true);
  })

})

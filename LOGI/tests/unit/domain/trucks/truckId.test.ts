import {expect} from "chai";
import {TruckId} from "../../../../src/domain/trucks/truckId";

describe('TruckId Unit Tests',()=>{
  it('create valid truckId',()=>{
    const value="AN-05-BG"
    const truckIdResult=TruckId.create(value);
    expect(truckIdResult.isSuccess).to.equal(true);
    expect(truckIdResult.getValue().value).to.equal(value);
  })

  it('create valid truckId 1',()=>{
    const value="16-MT-89"
    const truckIdResult=TruckId.create(value);
    expect(truckIdResult.isSuccess).to.equal(true);
    expect(truckIdResult.getValue().value).to.equal(value);
  })

  it('create valid truckId 2',()=>{
    const value="35-75-OP"
    const truckIdResult=TruckId.create(value);
    expect(truckIdResult.isSuccess).to.equal(true);
    expect(truckIdResult.getValue().value).to.equal(value);
  })

  it('create valid truckId 3',()=>{
    const value="VC-12-13"
    const truckIdResult=TruckId.create(value);
    expect(truckIdResult.isSuccess).to.equal(true);
    expect(truckIdResult.getValue().value).to.equal(value);
  })

  it('fail to create valid truckId with empty string',()=>{
    const value=""
    const truckIdResult=TruckId.create(value);
    expect(truckIdResult.isFailure).to.equal(true);
  })

  it('fail to create truckId with null value', () => {
    const value = null
    const truckIdResult = TruckId.create(value);
    expect(truckIdResult.isFailure).to.equal(true);
  })

  it('fail to create truckId with undefined value', () => {
    const value = undefined
    const truckIdResult = TruckId.create(value);
    expect(truckIdResult.isFailure).to.equal(true);
  })

  it('fail to create truckId with invalid format', () => {
    const value = "55-23-44"
    const truckIdResult = TruckId.create(value);
    expect(truckIdResult.isFailure).to.equal(true);
  })

  it('fail to create truckId with invalid format 1', () => {
    const value = "AA-BB-CC"
    const truckIdResult = TruckId.create(value);
    expect(truckIdResult.isFailure).to.equal(true);
  })

})

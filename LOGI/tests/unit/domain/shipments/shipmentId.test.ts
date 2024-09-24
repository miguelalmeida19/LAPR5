import {expect} from "chai";
import {ShipmentId} from "../../../../src/domain/shipments/shipmentId";

describe('ShipmentId Unit Tests',()=>{

  it('success - create valid shipmentId', ()=>{
    const value = "S01";
    const shipmentIdResult = ShipmentId.create(value);
    expect(shipmentIdResult.isSuccess).to.equal(true);
    expect(shipmentIdResult.getValue().value).to.equal(value);
  })

  it('fail - shipmentId with empty string', ()=>{
    const value = "";
    const shipmentIdResult = ShipmentId.create(value);
    expect(shipmentIdResult.isFailure).to.equal(true);
  })

  it('fail - shipmentId with null value', ()=>{
    const value = null;
    const shipmentIdResult = ShipmentId.create(value);
    expect(shipmentIdResult.isFailure).to.equal(true);
  })

  it('fail - shipmentId with invalid format', ()=>{
    const value = "ShipmentId01";
    const shipmentIdResult = ShipmentId.create(value);
    expect(shipmentIdResult.isFailure).to.equal(true);
  })

})

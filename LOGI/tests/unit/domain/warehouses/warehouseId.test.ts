import {expect} from "chai";
import {WarehouseId} from "../../../../src/domain/warehouses/warehouseId";

describe('WarehouseId Unit Tests',()=>{
  it('create valid warehouseId',()=>{
    const value="123a"
    const warehouseIdResult=WarehouseId.create(value);
    expect(warehouseIdResult.isSuccess).to.equal(true);
    expect(warehouseIdResult.getValue().value).to.equal(value);
  })

  it('fail to create warehouseId with null value', () => {
    const value = null
    const warehouseIdResult = WarehouseId.create(value);
    expect(warehouseIdResult.isFailure).to.equal(true);
  })

  it('fail to create warehouseId with undefined value', () => {
    const value = undefined
    const warehouseIdResult = WarehouseId.create(value);
    expect(warehouseIdResult.isFailure).to.equal(true);
  })

})

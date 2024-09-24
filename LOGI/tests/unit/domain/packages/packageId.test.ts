import {expect} from "chai";
import {PackageId} from "../../../../src/domain/packages/packageId";

describe('PackageId Unit Tests',()=>{

  it('success - create valid packageId', ()=>{
    const value = "P01";
    const result = PackageId.create(value);
    expect(result.isSuccess).to.equal(true);
    expect(result.getValue().value).to.equal(value);
  })

  it('fail - packageId with empty string', ()=>{
    const value = "";
    const result = PackageId.create(value);
    expect(result.isFailure).to.equal(true);
  })

  it('fail - packageId with null value', ()=>{
    const value = null;
    const result = PackageId.create(value);
    expect(result.isFailure).to.equal(true);
  })

  it('fail - packageId with invalid format', ()=>{
    const value = "packageId01";
    const result = PackageId.create(value);
    expect(result.isFailure).to.equal(true);
  })

})

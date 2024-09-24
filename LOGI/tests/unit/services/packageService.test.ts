import * as sinon from 'sinon';
import {assert} from "console";

import IPackageRepo from "../../../src/services/IRepos/IPackageRepo";
import IShipmentRepo from "../../../src/services/IRepos/IShipmentRepo";
import IPathRepo from "../../../src/services/IRepos/IPathRepo";
import PackageRepo from "../../../src/repos/packageRepo";
import ShipmentRepo from "../../../src/repos/shipmentRepo";
import PathRepo from "../../../src/repos/pathRepo";
import IPackageService from "../../../src/services/IServices/IPackageService";
import PackageService from "../../../src/services/packageService";
import {Package} from "../../../src/domain/packages/package";

describe('Test Package Service', () => {

  let packageRepo: IPackageRepo;
  let shipmentRepo: IShipmentRepo;
  let pathRepo: IPathRepo;
  let service: IPackageService;

  beforeEach(function() {
    packageRepo = new PackageRepo(null);
    shipmentRepo = new ShipmentRepo(null);
    pathRepo = new PathRepo(null);
    service = new PackageService(packageRepo, shipmentRepo, pathRepo);
  });

  afterEach(function() {
    sinon.restore();
  });

  const packageData = {
    packageId: "P10",
    expected: {
      packageId: "P01",
      xCoordinate: 10,
      yCoordinate: 11,
      zCoordinate: 12,
      shipmentId: "S01",
      deliveryId: "D01",
      pathId: "sdf4-40aa-35ut"
    },
    body: {
      packageId: "P01",
      xCoordinate: 10,
      yCoordinate: 11,
      zCoordinate: 12,
      shipmentId: "S01",
      deliveryId: "D01",
      pathId: "sdf4-40aa-35ut"
    },
    createPackage: () => { return Package.create(packageData.expected).getValue() }
  }

  it('success - findByPackageId valid packageId', async() => {
    const _package: Package = packageData.createPackage();
    sinon.stub(packageRepo, "findByPackageId").returns(_package);

    const result = await service.getPackage(packageData.expected.packageId);
    assert(result.isSuccess);
  })

  it('success - findByPackageId expect correct dto', async() => {
    const _package: Package = packageData.createPackage();
    sinon.stub(packageRepo, "findByPackageId").returns(_package);

    const result = await service.getPackage(packageData.expected.packageId);
    const expected = packageData.expected;

    assert(expected.packageId === result.getValue().packageId);
    assert(expected.xCoordinate === result.getValue().xCoordinate);
    assert(expected.yCoordinate === result.getValue().yCoordinate);
    assert(expected.zCoordinate === result.getValue().zCoordinate);
    assert(expected.shipmentId === result.getValue().shipmentId);
    assert(expected.deliveryId === result.getValue().deliveryId);
    assert(expected.pathId === result.getValue().pathId);
  })

  it('failure - findByPackageId empty packageId', async() => {
    const invalidPackageId = "";
    const result = await service.getPackage(invalidPackageId);
    assert(result.isFailure);
  })

  it('failure - findByPackageId null package', async() => {
    const invalidPackage: Package = null;
    sinon.stub(packageRepo, "findByPackageId").returns(invalidPackage);
    const result = await service.getPackage(packageData.expected.packageId);
    assert(result.isFailure);
  })

  it('success - save package data', async() => {
    const _package = packageData.createPackage();
    sinon.stub(packageRepo, "save").returns(_package);

    sinon.stub(service, 'checkIfDeliveryExists').resolves;
    sinon.stub(service, 'checkIfShipmentExists').resolves;
    sinon.stub(service, 'checkIfPackageIsAssignedToDelivery').resolves;
    sinon.stub(service, 'checkIfPathIsValidForPackage').resolves;

    const result = await service.createPackage(packageData.body);
    assert(result.isSuccess);
  })

  it('success - save package data expect correct DTO', async() => {
    const _package = packageData.createPackage();
    sinon.stub(packageRepo, "save").returns(_package);

    sinon.stub(service, 'checkIfDeliveryExists').resolves;
    sinon.stub(service, 'checkIfShipmentExists').resolves;
    sinon.stub(service, 'checkIfPackageIsAssignedToDelivery').resolves;
    sinon.stub(service, 'checkIfPathIsValidForPackage').resolves;

    const result = await service.createPackage(packageData.body);
    const expected = packageData.expected

    assert(expected.packageId === result.getValue().packageId);
    assert(expected.xCoordinate === result.getValue().xCoordinate);
    assert(expected.yCoordinate === result.getValue().yCoordinate);
    assert(expected.zCoordinate === result.getValue().zCoordinate);
    assert(expected.shipmentId === result.getValue().shipmentId);
    assert(expected.deliveryId === result.getValue().deliveryId);
    assert(expected.pathId === result.getValue().pathId);
  })

  it('success - findAll', async() => {
    const list: Package[] = [packageData.createPackage()];
    sinon.stub(packageRepo, "findAll").returns(list);
    const result = await service.getAll();
    assert(result.isSuccess);
  })

  it('fail - findAll', async() => {
    const list: Package[] = null;
    sinon.stub(packageRepo, "findAll").returns(list);
    const result = await service.getAll();
    assert(result.isFailure);
  })

  it('success - getByShipmentId', async() => {
    const list: Package[] = [packageData.createPackage()];
    sinon.stub(packageRepo, "findByShipment").returns(list);
    const result = await service.getByShipmentId(packageData.body.shipmentId);
    assert(result.isSuccess);
  })

  it('fail - getByShipmentId', async() => {
    const list: Package[] = null;
    sinon.stub(packageRepo, "findByShipment").returns(list);
    const result = await service.getByShipmentId(packageData.body.shipmentId);
    assert(result.isFailure);
  })

  it('success - getByPathId', async() => {
    const list: Package[] = [packageData.createPackage()];
    sinon.stub(packageRepo, "findByPath").returns(list);
    const result = await service.getByPathId(packageData.body.pathId);
    assert(result.isSuccess);
  })

  it('fail - getByPathId', async() => {
    const list: Package[] = null;
    sinon.stub(packageRepo, "findByPath").returns(list);
    const result = await service.getByPathId(packageData.body.pathId);
    assert(result.isFailure);
  })

})

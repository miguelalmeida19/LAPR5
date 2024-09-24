import IPathRepo from "../../../src/services/IRepos/IPathRepo";
import IPathService from "../../../src/services/IServices/IPathService";
import PathRepo from "../../../src/repos/pathRepo";
import PathService from "../../../src/services/pathService";
import {Path} from "../../../src/domain/paths/path";
import * as sinon from 'sinon';
import {assert} from "console";

describe('Test Path Service', () => {
  let pathRepo: IPathRepo
  let service: IPathService

  beforeEach(function () {
    pathRepo = new PathRepo(null);
    service = new PathService(pathRepo);
  });

  afterEach(function () {
    sinon.restore();
  });

  const pathData = {
    id: "1234",
    expected: {
      departureWarehouse: "123",
      arrivalWarehouse: "124",
      distance: 4300,
      duration: 80,
      consumedEnergy: 100,
    },
    body: {
      id: "1",
      departureWarehouse: "123",
      arrivalWarehouse: "124",
      distance: 4300,
      duration: 80,
      consumedEnergy: 100,
    },
    warehouses: {
      departureWarehouse: "123",
      arrivalWarehouse: "124"
    },
    createPath: () => {
      return Path.create(pathData.body).getValue()
    },
  }

  it('findByDomainId: Expect success response of path with valid pathId', async () => {
    const path: Path = pathData.createPath()
    sinon.stub(pathRepo, "findByDomainId").returns(path)
    const result = await service.getPath(pathData.body.id)
    assert(result.isSuccess)
  });

  it('findByDomainId: Expect failure response of path with invalid pathId', async () => {
    const invalidPathId = ""
    const result = await service.getPath(invalidPathId)
    assert(result.isFailure)
  });

  it('findByDomainId: Expect failure response of path with invalid pathId', async () => {
    const invalidPath: Path = null
    sinon.stub(pathRepo, "findByDomainId").returns(invalidPath)
    const result = await service.getPath(pathData.body.id)
    assert(result.isFailure)
  });

  it('findByDomainId: Expect correct dto with valid path for valid pathId', async function () {
    const path: Path = pathData.createPath()
    sinon.stub(pathRepo, "findByDomainId").returns(path)

    const result = await service.getPath(pathData.body.id)

    const expected = pathData.expected;
    assert(result.isSuccess)
    assert(expected.departureWarehouse === result.getValue().departureWarehouse);
    assert(expected.arrivalWarehouse === result.getValue().arrivalWarehouse);
    assert(expected.distance === result.getValue().distance);
    assert(expected.duration === result.getValue().duration);
    assert(expected.consumedEnergy === result.getValue().consumedEnergy);
  })

  it('save: Expect success with path data', async function () {
    const path = pathData.createPath()
    sinon.stub(pathRepo, "save").returns(path)

    sinon.stub(service, 'checkIfWarehousesExist').resolves
    sinon.stub(service, "checkIfAlreadyPathExists").resolves
    const result = await service.createPath(pathData.body)

    assert(result.isSuccess)
  })

  it('save: Expect correct dto with valid path data', async function () {
    const path = pathData.createPath()
    sinon.stub(pathRepo, "save").returns(path)
    sinon.stub(service, 'checkIfWarehousesExist').resolves
    sinon.stub(service, "checkIfAlreadyPathExists").resolves
    const result = await service.createPath(pathData.body)
    const expected=pathData.expected;
    assert(expected.departureWarehouse === result.getValue().departureWarehouse);
    assert(expected.arrivalWarehouse === result.getValue().arrivalWarehouse);
    assert(expected.distance === result.getValue().distance);
    assert(expected.duration === result.getValue().duration);
    assert(expected.consumedEnergy === result.getValue().consumedEnergy);
  })

  it('save: Expect failure when save is null', async function () {
    sinon.stub(pathRepo, "save").returns(null)
    const result = await service.createPath(pathData.body)
    assert(result.isFailure)
  })

  it('findAll: Expect success response of paths', async () => {
    const listPaths : Path[]   = [pathData.createPath()]
    sinon.stub(pathRepo, "findAll").returns(listPaths)
    const result = await service.getAll()
    assert(result.isSuccess)
  });

  it('findAll: Expect failure response of paths with invalid paths', async () => {
    const invalidListPaths : Path[]  = null
    sinon.stub(pathRepo, "findAll").returns(invalidListPaths)
    const result = await service.getAll()
    assert(result.isFailure)
  });

  it('findByWarehouses: Expect success response of paths with valid warehouses', async () => {
    const listPaths : Path[]   = [pathData.createPath()]
    sinon.stub(pathRepo, "findByWarehouses").returns(listPaths)
    const result = await service.getByWarehouses(pathData.warehouses.departureWarehouse,pathData.warehouses.arrivalWarehouse)
    assert(result.isSuccess)
  });

  it('findByWarehouses: Expect failure response of path with invalid warehouses', async () => {
    const invalidWarehouseId = ""
    const invalidListPaths : Path[]   = null
    sinon.stub(pathRepo, "findByWarehouses").returns(invalidListPaths)
    const result = await service.getByWarehouses(invalidWarehouseId,invalidWarehouseId)
    assert(result.isFailure)
  });

  it('findByWarehouses: Expect failure response of path with invalid warehouses', async () => {
    const invalidPaths: Path[] = null
    sinon.stub(pathRepo, "findByWarehouses").returns(invalidPaths)
    const result = await service.getByWarehouses(pathData.warehouses.departureWarehouse,pathData.warehouses.arrivalWarehouse)
    assert(result.isFailure)
  });

  it('findByWarehouses: Expect success response of paths with valid departureWarehouse and arrivalWarehouse', async () => {
    const listPaths : Path[]   = [pathData.createPath()]
    sinon.stub(pathRepo, "findByWarehouses").returns(listPaths)
    const result = await service.getByWarehouses(pathData.warehouses.departureWarehouse, pathData.warehouses.arrivalWarehouse)
    assert(result.isSuccess)
  })

  it('findByDepartureWarehouse: Expect success response of paths with valid departureWarehouse', async () => {
    const listPaths : Path[]   = [pathData.createPath()]
    sinon.stub(pathRepo, "findByDepartureWarehouse").returns(listPaths)
    const result = await service.getByDepartureWarehouse(pathData.warehouses.departureWarehouse)
    assert(result.isSuccess)
  });

  it('findByDepartureWarehouse: Expect failure response of paths with invalid departureWarehouse', async () => {
    const invalidDepartureWarehouse = "";
    const invalidListPaths : Path[]   = null
    sinon.stub(pathRepo, "findByDepartureWarehouse").returns(invalidListPaths)
    const result = await service.getByDepartureWarehouse(invalidDepartureWarehouse)
    assert(result.isFailure)
  });

  it('findByDepartureWarehouse: Expect failure response of feed paths with invalid departureWarehouse', async () => {
    const invalidListPaths : Path[]   = null
    sinon.stub(pathRepo, "findByDepartureWarehouse").returns(invalidListPaths)
    const result = await service.getByDepartureWarehouse(pathData.warehouses.departureWarehouse)
    assert(result.isFailure)
  });

  it('findByDepartureWarehouse: Expect correct dto with valid paths for valid departureWarehouse', async function () {
    const listPosts : Path[]   = [pathData.createPath()]
    sinon.stub(pathRepo, "findByDepartureWarehouse").returns(listPosts)

    const result = await service.getByDepartureWarehouse(pathData.warehouses.departureWarehouse)

    const expected=pathData.expected;
    assert(result.isSuccess)
    assert(expected.departureWarehouse === result.getValue()[0].departureWarehouse);
    assert(expected.arrivalWarehouse === result.getValue()[0].arrivalWarehouse);
    assert(expected.distance === result.getValue()[0].distance);
    assert(expected.duration === result.getValue()[0].duration);
    assert(expected.consumedEnergy === result.getValue()[0].consumedEnergy);  })

  it('findByArrivalWarehouse: Expect success response of paths with valid arrivalWarehouse', async () => {
    const listPaths : Path[]   = [pathData.createPath()]
    sinon.stub(pathRepo, "findByArrivalWarehouse").returns(listPaths)
    const result = await service.getByArrivalWarehouse(pathData.warehouses.arrivalWarehouse)
    assert(result.isSuccess)
  });

  it('findByArrivalWarehouse: Expect failure response of paths with invalid arrivalWarehouse', async () => {
    const invalidArrivalWarehouse = "";
    const invalidListPaths : Path[]   = null
    sinon.stub(pathRepo, "findByArrivalWarehouse").returns(invalidListPaths)
    const result = await service.getByArrivalWarehouse(invalidArrivalWarehouse)
    assert(result.isFailure)
  });

  it('findByArrivalWarehouse: Expect failure response of feed paths with invalid arrivalWarehouse', async () => {
    const invalidListPaths : Path[]   = null
    sinon.stub(pathRepo, "findByArrivalWarehouse").returns(invalidListPaths)
    const result = await service.getByArrivalWarehouse(pathData.warehouses.arrivalWarehouse)
    assert(result.isFailure)
  });

  it('findByArrivalWarehouse: Expect correct dto with valid paths for valid arrivalWarehouse', async function () {
    const listPosts : Path[]   = [pathData.createPath()]
    sinon.stub(pathRepo, "findByArrivalWarehouse").returns(listPosts)

    const result = await service.getByArrivalWarehouse(pathData.warehouses.arrivalWarehouse)

    const expected=pathData.expected;
    assert(result.isSuccess)
    assert(expected.departureWarehouse === result.getValue()[0].departureWarehouse);
    assert(expected.arrivalWarehouse === result.getValue()[0].arrivalWarehouse);
    assert(expected.distance === result.getValue()[0].distance);
    assert(expected.duration === result.getValue()[0].duration);
    assert(expected.consumedEnergy === result.getValue()[0].consumedEnergy);  })

});

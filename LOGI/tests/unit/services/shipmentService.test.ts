import * as sinon from 'sinon';
import {assert} from "console";

import IShipmentRepo from "../../../src/services/IRepos/IShipmentRepo";
import ITruckRepo from "../../../src/services/IRepos/ITruckRepo";
import IShipmentService from "../../../src/services/IServices/IShipmentService";
import ShipmentRepo from "../../../src/repos/shipmentRepo";
import TruckRepo from "../../../src/repos/truckRepo";
import ShipmentService from "../../../src/services/shipmentService";
import {Shipment} from "../../../src/domain/shipments/shipment";

describe('Test Shipment Service', () => {

  let shipmentRepo: IShipmentRepo;
  let truckRepo: ITruckRepo;
  let service: IShipmentService;

  beforeEach(function() {
    truckRepo = new TruckRepo(null);
    shipmentRepo = new ShipmentRepo(null);
    service = new ShipmentService(shipmentRepo, truckRepo);
  });

  afterEach(function() {
    sinon.restore();
  });

  const shipmentData = {
    shipmentId: "1234",
    expected: {
      shipmentId: "S01",
      truckId: "16-86-DR",
      toBeDeliveredDay: 13,
      toBeDeliveredMonth: 7,
      toBeDeliveredYear: 2023
    },
    body: {
      shipmentId: "",
      truckId: "16-86-DR",
      toBeDeliveredDay: 13,
      toBeDeliveredMonth: 7,
      toBeDeliveredYear: 2023
    },
    createShipment: () => { return Shipment.create(shipmentData.expected).getValue() }
  }

  it('success - findByShipmentId valid shipmentId', async() => {
    const _shipment: Shipment = shipmentData.createShipment();
    sinon.stub(shipmentRepo, "findByShipmentId").returns(_shipment);
    const result = await service.getShipment(shipmentData.expected.shipmentId);
    assert(result.isSuccess);
  })

  it('success - findByShipmentId expect correct DTO', async() => {
    const _shipment: Shipment = shipmentData.createShipment();
    sinon.stub(shipmentRepo, "findByShipmentId").returns(_shipment);

    const result = await service.getShipment(shipmentData.expected.shipmentId);
    const expected = shipmentData.expected;

    assert(expected.shipmentId === result.getValue().shipmentId);
    assert(expected.truckId === result.getValue().truckId);
    assert(expected.toBeDeliveredDay === result.getValue().toBeDeliveredDay);
    assert(expected.toBeDeliveredMonth === result.getValue().toBeDeliveredMonth);
    assert(expected.toBeDeliveredYear === result.getValue().toBeDeliveredYear);
  })

  it('fail - findByShipmentId empty shipmentId', async() => {
    const invalidShipmentId = "";
    const result = await service.getShipment(invalidShipmentId);
    assert(result.isFailure);
  })

  it('fail - findByShipmentId null shipmentId', async() => {
    const invalidShipment: Shipment = null;
    sinon.stub(shipmentRepo, "findByShipmentId").returns(invalidShipment);
    const result = await service.getShipment(shipmentData.expected.shipmentId);
    assert(result.isFailure);
  })


  it('success - save shipment data', async() => {
    const _shipment = shipmentData.createShipment();
    sinon.stub(shipmentRepo, "save").returns(_shipment);

    sinon.stub(service, 'checkIfTruckExists').resolves;
    sinon.stub(service, 'checkIfShipmentExists').resolves;
    const result = await service.createShipment(shipmentData.body);
    assert(result.isSuccess);
  })

  it('success - save shipment data expect correct DTO', async() => {
    const _shipment = shipmentData.createShipment();
    sinon.stub(shipmentRepo, "save").returns(_shipment);

    sinon.stub(service, 'checkIfTruckExists').resolves;
    sinon.stub(service, 'checkIfShipmentExists').resolves;

    const result = await service.createShipment(shipmentData.expected);
    const expected = shipmentData.expected;

    assert(expected.shipmentId === result.getValue().shipmentId);
    assert(expected.truckId === result.getValue().truckId);
    assert(expected.toBeDeliveredDay === result.getValue().toBeDeliveredDay);
    assert(expected.toBeDeliveredMonth === result.getValue().toBeDeliveredMonth);
    assert(expected.toBeDeliveredYear === result.getValue().toBeDeliveredYear);
  })

  it('success - findAll', async() => {
    const list: Shipment[] = [shipmentData.createShipment()];
    sinon.stub(shipmentRepo, "findAll").returns(list);
    const result = await service.getAll();
    assert(result.isSuccess);
  })

  it('fail - findAll', async() => {
    const list: Shipment[] = null;
    sinon.stub(shipmentRepo, "findAll").returns(list);
    const result = await service.getAll();
    assert(result.isFailure);
  })

  it('success - findByTruck', async() => {
    const list: Shipment[] = [shipmentData.createShipment()];
    sinon.stub(shipmentRepo, "findByTruck").returns(list);
    const result = await service.getByTruckId(shipmentData.body.truckId);
    assert(result.isSuccess);
  })

  it('success - findByTruck expect correct DTO', async() => {
    const list: Shipment[] = [shipmentData.createShipment()];
    sinon.stub(shipmentRepo, "findByTruck").returns(list);
    const result = await service.getByTruckId(shipmentData.body.truckId);
    const expected = shipmentData.expected;
    assert(expected.shipmentId === result.getValue()[0].shipmentId);
    assert(expected.truckId === result.getValue()[0].truckId);
    assert(expected.toBeDeliveredDay === result.getValue()[0].toBeDeliveredDay);
    assert(expected.toBeDeliveredMonth === result.getValue()[0].toBeDeliveredMonth);
    assert(expected.toBeDeliveredYear === result.getValue()[0].toBeDeliveredYear);
  })

  it('fail - findByTruck', async() => {
    const list: Shipment[] = null;
    sinon.stub(shipmentRepo, "findByTruck").returns(list);
    const result = await service.getByTruckId(shipmentData.body.truckId);
    assert(result.isFailure);
  })

})

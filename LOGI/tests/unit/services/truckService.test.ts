import * as sinon from 'sinon';
import { assert } from 'console';
import ITruckRepo from '../../../src/services/IRepos/ITruckRepo';
import ITruckService from "../../../src/services/IServices/ITruckService";
import TruckRepo from "../../../src/repos/truckRepo";
import TruckService from "../../../src/services/truckService";
import {Truck} from "../../../src/domain/trucks/truck";


describe('Test Truck Service', () => {

  let truckRepo: ITruckRepo
  let service: ITruckService

  beforeEach(function () {
    truckRepo = new TruckRepo(null);
    service = new TruckService(truckRepo);
  });

  afterEach(function () {
    sinon.restore();
  });

  const truckData = {
    truckId: "1234",
    expected: {
      truckId: "22-BB-12",
      tare: 7500,
      capacity: 4300,
      batteryCharge: 80,
      autonomy: 100,
      rechargeBattery: 60,
      active: true
    },
    body: {
      truckId: "",
      tare: 7500,
      capacity: 4300,
      batteryCharge: 80,
      autonomy: 100,
      rechargeBattery: 60,
      active: true
    },
    createTruck: () => { return Truck.create(truckData.expected).getValue()},
  }

  it('findByDomainId: Expect success response of truck with valid truckId', async () => {
    const truck : Truck = truckData.createTruck()
    sinon.stub(truckRepo, "findByDomainId").returns(truck)
    const result = await service.getTruck(truckData.expected.truckId)
    assert(result.isSuccess)
  });

  it('findByDomainId: Expect failure response of truck with invalid truckId', async () => {
    const invalidTruckId = ""
    const result = await service.getTruck(invalidTruckId)
    assert(result.isFailure)
  });

  it('findByDomainId: Expect failure response of truck with invalid truckId', async () => {
    const invalidTruck : Truck = null
    sinon.stub(truckRepo, "findByDomainId").returns(invalidTruck)
    const result = await service.getTruck(truckData.expected.truckId)
    assert(result.isFailure)
  });

  it('findByDomainId: Expect correct dto with valid truck for valid truckId', async function () {
    const truck : Truck = truckData.createTruck()
    sinon.stub(truckRepo, "findByDomainId").returns(truck)

    const result = await service.getTruck(truckData.expected.truckId)

    const expected=truckData.expected;
    assert(result.isSuccess)
    assert(expected === result[0]);
  })

  it('save: Expect success with truck data',async function(){
    const truck = truckData.createTruck()
    sinon.stub(truckRepo, "save").returns(truck)
    const result=await service.createTruck(truckData.expected)
    assert(result.isSuccess)
  })

  it('save: Expect correct dto with valid truck data', async function () {
    const truck = truckData.createTruck()
    sinon.stub(truckRepo, "save").returns(truck)
    const result = await service.createTruck(truckData.expected)
    const expected=truckData.expected;
    assert(expected.truckId === result.getValue().truckId);
    assert(expected.tare === result.getValue().tare);
    assert(expected.capacity === result.getValue().capacity);
    assert(expected.batteryCharge === result.getValue().batteryCharge);
    assert(expected.autonomy === result.getValue().autonomy);
    assert(expected.rechargeBattery === result.getValue().rechargeBattery);
  })

  it('save: Expect failure when save is null', async function () {
    sinon.stub(truckRepo, "save").returns(null)
    const result = await service.createTruck(truckData.body)
    assert(result.isFailure)
  })

  it('findAll: Expect success response of trucks', async () => {
    const listTrucks : Truck[]   = [truckData.createTruck()]
    sinon.stub(truckRepo, "findAll").returns(listTrucks)
    const result = await service.getAll()
    assert(result.isSuccess)
  });

  it('findAll: Expect failure response of trucks with invalid trucks', async () => {
    const invalidListTrucks : Truck[]  = null
    sinon.stub(truckRepo, "findAll").returns(invalidListTrucks)
    const result = await service.getAll()
    assert(result.isFailure)
  });

});

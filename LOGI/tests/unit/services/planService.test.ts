import IPlanRepo from "../../../src/services/IRepos/IPlanRepo";
import IPlanService from "../../../src/services/IServices/IPlanService";
import PlanRepo from "../../../src/repos/planRepo";
import PlanService from "../../../src/services/planService";
import IPlanDTO from "../../../src/dto/IPlanDTO";
import * as sinon from 'sinon';
import assert = require("node:assert");

describe("Test Plan Service", () => {
  let planRepo: IPlanRepo;
  let service: IPlanService;

  beforeEach(function () {
    planRepo = new PlanRepo(null);
    service = new PlanService(planRepo);
  });

  afterEach(function () {
    sinon.restore();
  });

  const planDTO: IPlanDTO = {
    number_of_generations: 1,
    population_dimension: 1,
    crossing_probability: 1,
    mutation_probability: 1,
    truck1: [1, 2, 3],
  };
  const truckWarehousesData = [1, 2, 3];
  const simulatedTruckWarehousesData = [1, 2, 3];

  const mockTruckTimeResponse = {
    Z: 2.5,
    H: [1, 2, 3],
  };

  it("getTruckTime: should return a Result object with a value of truck time response", async () => {
    sinon.stub(planRepo, "getTruckTime").resolves(mockTruckTimeResponse);

    const result = await service.getTruckTime(planDTO);

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toEqual({Z: 2.5, H: [1, 2, 3]});
  });

  it("getTruckTime: should return a Result object with an error message", async () => {
    sinon.stub(planRepo, "getTruckTime").throws("Error getting truck time");

    const result = await service.getTruckTime(planDTO);

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe("Error getting truck time");
  });

  it("getSimulatedTruckTime: should return a Result object with a value of simulated truck time response", async () => {
    sinon.stub(planRepo, "getSimulatedTruckTime").resolves(mockTruckTimeResponse);

    const result = await service.getSimulatedTruckTime(planDTO);

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toEqual({Z: 2.5, H: [1, 2, 3]});
  });

  it("getSimulatedTruckTime: should return a Result object with an error message", async () => {
    sinon.stub(planRepo, "getSimulatedTruckTime").throws("Error getting truck simulated time");

    const result = await service.getSimulatedTruckTime(planDTO);

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe("Error getting truck simulated time");
  });

  it('getTruckWarehouses: should return a Result object with the expected truck warehouses', async () => {
    sinon.stub(planRepo, 'getTruckWarehouses').resolves(truckWarehousesData);

    const result = await service.getTruckWarehouses();

    assert(result.isSuccess);
    assert.deepEqual(result.getValue(), truckWarehousesData);
  });

  it('getTruckWarehouses: should return a Result object with an error message', async () => {
    sinon.stub(planRepo, 'getTruckWarehouses').rejects(new Error('Error getting truck warehouses'));

    const result = await service.getTruckWarehouses();

    assert(result.isFailure);
    assert.strictEqual(result.error, 'Error getting truck warehouses');
  });

  it('should return a Result object with the simulated truck warehouses data', async () => {
    sinon.stub(planRepo, 'getSimulatedTruckWarehouses').resolves(simulatedTruckWarehousesData);
    const result = await service.getSimulatedTruckWarehouses();
    assert(result.isSuccess);
    assert.deepEqual(result.getValue(), simulatedTruckWarehousesData);
  });

  it('should return a Result object with an error message if an error occurs', async () => {
    sinon.stub(planRepo, 'getSimulatedTruckWarehouses').rejects(new Error('Error getting simulated truck warehouses'));
    const result = await service.getSimulatedTruckWarehouses();
    assert(result.isFailure);
    assert(result.error === 'Error getting simulated truck warehouses');
  });
});

import * as sinon from 'sinon';
import {Request, Response, NextFunction} from 'express';
import {assert} from 'console';
import IPlanRepo from '../../src/services/IRepos/IPlanRepo';
import IPlanService from '../../src/services/IServices/IPlanService';
import IPlanController from '../../src/controllers/IControllers/IPlanController';
import PlanRepo from '../../src/repos/planRepo';
import PlanService from '../../src/services/planService';
import planController from '../../src/controllers/planController';
import {truckTimeResponse} from './mockData';
import IPlanDTO from "../../src/dto/IPlanDTO";

describe('plan controller + service + repo integration tests', () => {
  let planRepo: IPlanRepo;
  let service: IPlanService;
  let ctrl: IPlanController;

  beforeEach(() => {
    planRepo = new PlanRepo(null);
    service = new PlanService(planRepo);
    ctrl = new planController(service);
  });

  afterEach(() => {
    sinon.restore();
  });

  const planDTO: IPlanDTO = {
    number_of_generations: 1,
    population_dimension: 1,
    crossing_probability: 1,
    mutation_probability: 1,
    truck1: [1, 2, 3],
  };

  it('getTruckTime: returns expected string', async () => {
    const queryParams = {};
    Object.entries(planDTO).forEach(([key, value]) => {
      queryParams[key] = String(value);
    });
    let req: Partial<Request> = {};
    req.query = queryParams;


    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    };

    let next: Partial<NextFunction> = () => {
    };
    sinon.stub(planRepo, 'getTruckTime').resolves(truckTimeResponse);
    await ctrl.getTruckTime(<Request>req, <Response>res, <NextFunction>next);
    sinon.assert.calledOnce(res.json);
  });

  it('getSimulatedTruckTime: returns expected dto for valid parameters', async () => {
    const queryParams = {};
    Object.entries(planDTO).forEach(([key, value]) => {
      queryParams[key] = String(value);
    });
    let req: Partial<Request> = {};
    req.query = queryParams;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    };

    let next: Partial<NextFunction> = () => {
    };

    sinon.stub(service, 'getSimulatedTruckTime').resolves(truckTimeResponse);
    await ctrl.getSimulateTruckTime(<Request>req, <Response>res, <NextFunction>next);
  });

  it('getTruckWarehouses: returns expected array', async () => {
    let req: Partial<Request> = {};

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    };

    let next: Partial<NextFunction> = () => {
    };

    const warehouses = [1, 2, 3];
    sinon.stub(planRepo, 'getTruckWarehouses').resolves(warehouses);
    await ctrl.getNumberOfTrucks(<Request>req, <Response>res, <NextFunction>next);
  });

  it('getSimulatedTruckWarehouses: returns expected array of arrays', async () => {
    let req: Partial<Request> = {};
    req.query = {};
    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    };

    let next: Partial<NextFunction> = () => {
    };

    const simulatedTruckWarehouses = [[1, 2, 3], [4, 5, 6]];
    sinon.stub(planRepo, 'getSimulatedTruckWarehouses').resolves(simulatedTruckWarehouses);
    await ctrl.getSimulatedNumberOfTrucks(<Request>req, <Response>res, <NextFunction>next);
    sinon.assert.calledOnce(res.json);
  });

});

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { assert } from 'console';
import ITruckRepo from "../../src/services/IRepos/ITruckRepo";
import ITruckService from "../../src/services/IServices/ITruckService";
import ITruckController from "../../src/controllers/IControllers/ITruckController";
import TruckRepo from "../../src/repos/truckRepo";
import TruckService from "../../src/services/truckService";
import truckController from '../../src/controllers/truckController';
import {Truck} from "../../src/domain/trucks/truck";


describe('truck controller + service Integration Test', function () {

  let truckRepo: ITruckRepo
  let service: ITruckService
  let ctrl: ITruckController

  beforeEach(function () {
    truckRepo = new TruckRepo(null);
    service = new TruckService(truckRepo);
    ctrl = new truckController(service);
  });

  afterEach(function () {
    sinon.restore();
  });

  const truckData = {
    expected: {
      "truckId": "CD-00-IS",
      "tare": 123,
      "capacity": 345,
      "batteryCharge": 1.4,
      "autonomy": 20.5,
      "rechargeBattery": 123,
      "active": true
    },
    body: {
      "truckId": "DFCF-00-IS",
      "tare": 123,
      "capacity": 345,
      "batteryCharge": 1.4,
      "autonomy": 20.5,
      "rechargeBattery": 123,
      "active": true
    },
    createTruck: () => { return Truck.create(truckData.expected).getValue() },
  }

  it('Truck: returns 201 for valid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = truckData.expected;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };
    const truck = truckData.expected
    sinon.stub(truckRepo, "save").returns(truck)
    await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next)
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, sinon.match(201));
  });

  it('Truck: returns expected dto for valid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = truckData.expected;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }
    let next: Partial<NextFunction> = () => { };

    const truck = truckData.expected
    sinon.stub(truckRepo, "save").returns(truck)
    await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next)
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(truckData.expected));
  });

  it('Truck: returns bad request for invalid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = truckData.body;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };
    truckData.body.truckId = ""
    sinon.stub(truckRepo, "save").returns(truckData.body)
    await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next)
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, sinon.match(400));
  });

  it('Truck: returns next function when exception is thrown', async function () {
    let req: Partial<Request> = {}
    req.body = truckData.expected;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { return true };
    truckData.body.truckId = ""

    sinon.stub(truckRepo, "save").throws();
    const result = await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next)
    assert(result)
  });
});

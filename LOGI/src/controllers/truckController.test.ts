import * as sinon from 'sinon';

import {Response, Request, NextFunction} from 'express';

import {Result} from '../core/logic/Result';

import ITruckService from "../services/IServices/ITruckService";
import ITruckDTO from '../dto/ITruckDTO';
import TruckService from '../services/truckService';
import truckController from "./truckController";
import {assert} from "console";

describe('truck controller', function () {
  beforeEach(function () {
  });

  let validTruck: ITruckDTO = {
    "truckId": "CF-00-IS",
    "tare": 123,
    "capacity": 345,
    "batteryCharge": 1.4,
    "autonomy": 20.5,
    "rechargeBattery": 123,
    "active": true
  }

  let invalidTruck: ITruckDTO = {
    "truckId": "EFCF-00-IS",
    "tare": -123,
    "capacity": 345,
    "batteryCharge": 1.4,
    "autonomy": 20.5,
    "rechargeBattery": 123,
    "active": true
  }

  it('createTruck: returns 201 for valid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = validTruck;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };
    let service = new TruckService(null);
    let ctrl = new truckController(service as ITruckService);
    sinon.stub(service, "createTruck").returns(Result.ok<ITruckDTO>(validTruck))
    await ctrl.createTruck(<Request>req,<Response>res,<NextFunction>next)
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, sinon.match(201));
  });

  it('createTruck: returns expected dto for valid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = validTruck;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };
    let service = new TruckService(null);
    let ctrl = new truckController(service as ITruckService);
    sinon.stub(service, "createTruck").returns(Result.ok<ITruckDTO>(validTruck))
    await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next)
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(validTruck));
  });

  it('createTruck: returns bad request for invalid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = validTruck;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };
    let service = new TruckService(null);
    let ctrl = new truckController(service as ITruckService);
    validTruck.truckId = ""
    sinon.stub(service, "createTruck").returns(Result.fail<ITruckDTO>(validTruck))
    await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next)
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, sinon.match(400));
  });

  it('createTruck: returns next function when exception is thrown', async function () {
    let req: Partial<Request> = {}
    req.body = validTruck;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }
    let next: Partial<NextFunction> = () => {return true;};
    let service = new TruckService(null);
    let ctrl = new truckController(service as ITruckService);
    sinon.stub(service, "createTruck").throws();
    const result=await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next)
    assert(result)
    sinon.restore();
  });

  it('updateTruck: returns 200 for valid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = validTruck;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };
    let service = new TruckService(null);
    let ctrl = new truckController(service as ITruckService);
    sinon.stub(service, "updateTruck").returns(Result.ok<ITruckDTO>(validTruck))
    await ctrl.updateTruck(<Request>req,<Response>res,<NextFunction>next)
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, sinon.match(200));
  });

  it('updateTruck: returns expected dto for valid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = validTruck;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };
    let service = new TruckService(null);
    let ctrl = new truckController(service as ITruckService);
    sinon.stub(service, "updateTruck").returns(Result.ok<ITruckDTO>(validTruck))
    await ctrl.updateTruck(<Request>req, <Response>res, <NextFunction>next)
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(validTruck));
  });

  it('updateTruck: returns bad request for invalid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = validTruck;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };
    let service = new TruckService(null);
    let ctrl = new truckController(service as ITruckService);
    validTruck.truckId = ""
    sinon.stub(service, "updateTruck").returns(Result.fail<ITruckDTO>(validTruck))
    await ctrl.updateTruck(<Request>req, <Response>res, <NextFunction>next)
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, sinon.match(400));
  });

  it('updateTruck: returns next function when exception is thrown', async function () {
    let req: Partial<Request> = {}
    req.body = validTruck;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }
    let next: Partial<NextFunction> = () => {return true;};
    let service = new TruckService(null);
    let ctrl = new truckController(service as ITruckService);
    sinon.stub(service, "updateTruck").throws();
    const result=await ctrl.updateTruck(<Request>req, <Response>res, <NextFunction>next)
    assert(result)
    sinon.restore();
  });

  const expectedTrucks : ITruckDTO[] = [
    {
      "truckId": "CF-00-IS",
      "tare": 123,
      "capacity": 345,
      "batteryCharge": 1.4,
      "autonomy": 20.5,
      "rechargeBattery": 123,
      "active": true
    }
  ]

  it('getAll: returns json with array with trucks', async function () {

    let req: Partial<Request> = {};
    let body = {}
    req.body = body;

    let res: Partial<Response> = {
      status: sinon.spy(),
      json: sinon.spy()
    };

    let next: Partial<NextFunction> = () => {};

    const service : ITruckService= new TruckService(null);
    sinon.stub(service,"getAll").returns(Result.ok<ITruckDTO[]>(expectedTrucks));

    const ctrl = new truckController(service as ITruckService);
    await ctrl.getAll(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status,sinon.match(200));
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(expectedTrucks));
  });
});

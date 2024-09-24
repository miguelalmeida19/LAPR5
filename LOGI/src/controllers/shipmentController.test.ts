import * as sinon from 'sinon';
import {Response, Request, NextFunction} from 'express';

import {Result} from '../core/logic/Result';
import IShipmentService from "../services/IServices/IShipmentService";
import IShipmentDTO from "../dto/IShipmentDTO";
import ShipmentService from "../services/shipmentService";
import shipmentController from "./shipmentController";

import {assert} from "console";

describe('shipment controller', function () {
  beforeEach(function () {
  });

  let validShipment: IShipmentDTO = {
    "shipmentId": "S01",
    "truckId": "16-86-DR",
    "toBeDeliveredDay": 13,
    "toBeDeliveredMonth": 7,
    "toBeDeliveredYear": 2023
  }

  let invalidShipment: IShipmentDTO = {
    "shipmentId": "S909",
    "truckId": "16-86-DR3",
    "toBeDeliveredDay": 32,
    "toBeDeliveredMonth": 13,
    "toBeDeliveredYear": 2020
  }

  it('success createShipment: returns 201 for valid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = validShipment;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };

    let service = new ShipmentService(null, null);
    let ctrl = new shipmentController(service as IShipmentService);
    sinon.stub(service, "createShipment").returns(Result.ok<IShipmentDTO>(validShipment));
    await ctrl.createShipment(<Request>req,<Response>res,<NextFunction>next)
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, sinon.match(201));
  });


  it('success createShipment: returns expected dto for valid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = validShipment;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };

    let service = new ShipmentService(null, null);
    let ctrl = new shipmentController(service as IShipmentService);
    sinon.stub(service, "createShipment").returns(Result.ok<IShipmentDTO>(validShipment));
    await ctrl.createShipment(<Request>req,<Response>res,<NextFunction>next)
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(validShipment));
  });

  it('failure createShipment: returns 400 for invalid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = invalidShipment;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };

    let service = new ShipmentService(null, null);
    let ctrl = new shipmentController(service as IShipmentService);
    sinon.stub(service, "createShipment").returns(Result.fail<IShipmentDTO>(invalidShipment));
    await ctrl.createShipment(<Request>req,<Response>res,<NextFunction>next)
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, sinon.match(400));
  });

  it('createShipment: return nextFunction when exception is thrown', async function () {
    let req: Partial<Request> = {}
    req.body = validShipment;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { return true };

    let service = new ShipmentService(null, null);
    let ctrl = new shipmentController(service as IShipmentService);
    sinon.stub(service, "createShipment").throws();
    const result = await ctrl.createShipment(<Request> req, <Response> res, <NextFunction> next);
    assert(result);
    sinon.restore();
  });

  it('success updateShipment: returns 200 for valid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = validShipment;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };

    let service = new ShipmentService(null, null);
    let ctrl = new shipmentController(service as IShipmentService);
    sinon.stub(service, "updateShipment").returns(Result.ok<IShipmentDTO>(validShipment));
    await ctrl.updateShipment(<Request>req,<Response>res,<NextFunction>next)
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, sinon.match(200));
  });

  it('success updateShipment: returns expected for valid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = validShipment;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };

    let service = new ShipmentService(null, null);
    let ctrl = new shipmentController(service as IShipmentService);
    sinon.stub(service, "updateShipment").returns(Result.ok<IShipmentDTO>(validShipment));
    await ctrl.updateShipment(<Request>req,<Response>res,<NextFunction>next)
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(validShipment));
  });

  it('failure updateShipment: returns 400 for invalid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = invalidShipment;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };

    let service = new ShipmentService(null, null);
    let ctrl = new shipmentController(service as IShipmentService);
    sinon.stub(service, "updateShipment").returns(Result.fail<IShipmentDTO>(invalidShipment));
    await ctrl.updateShipment(<Request>req,<Response>res,<NextFunction>next)
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, sinon.match(400));
  });

  it('updateShipment: return nextFunction when exception is thrown', async function () {
    let req: Partial<Request> = {}
    req.body = validShipment;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { return true };

    let service = new ShipmentService(null, null);
    let ctrl = new shipmentController(service as IShipmentService);
    sinon.stub(service, "updateShipment").throws();
    const result = await ctrl.updateShipment(<Request> req, <Response> res, <NextFunction> next);
    assert(result);
    sinon.restore();
  });

  const expectedShipments : IShipmentDTO[] = [
    {
      "shipmentId": "S01",
      "truckId": "16-86-DR",
      "toBeDeliveredDay": 13,
      "toBeDeliveredMonth": 7,
      "toBeDeliveredYear": 2023
    }
  ]

  it('getAll: returns json with array with shipments', async function () {
    let req: Partial<Request> = {};
    let body = {}
    req.body = body;

    let res: Partial<Response> = {
      status: sinon.spy(),
      json: sinon.spy()
    };

    let next: Partial<NextFunction> = () => {};

    const service : IShipmentService= new ShipmentService(null, null);
    sinon.stub(service,"getAll").returns(Result.ok<IShipmentDTO[]>(expectedShipments));

    const ctrl = new shipmentController(service as IShipmentService);
    await ctrl.getAll(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status,sinon.match(200));
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(expectedShipments));
  });

})

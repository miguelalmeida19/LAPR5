import * as sinon from 'sinon';
import {Response, Request, NextFunction} from 'express';

import {Result} from '../core/logic/Result';
import IPackageService from "../services/IServices/IPackageService";
import IPackageDTO from "../dto/IPackageDTO";
import PackageService from "../services/packageService";
import packageController from "./packageController";

import {assert} from "console";

describe('package controller', function () {
  beforeEach(function () {
  });

  let validPackage: IPackageDTO = {
    packageId: "P01",
    xCoordinate: 10,
    yCoordinate: 11,
    zCoordinate: 12,
    shipmentId: "S01",
    deliveryId: "D01",
    pathId: "sdf4-40aa-35ut"
  }

  let invalidPackage: IPackageDTO = {
    packageId: "P011",
    xCoordinate: -1,
    yCoordinate: -1,
    zCoordinate: -1,
    shipmentId: "S011",
    deliveryId: "D011",
    pathId: undefined
  }

  it('success createPackage: returns 201 for valid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = validPackage;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };

    let service = new PackageService(null, null, null);
    let ctrl = new packageController(service as IPackageService);
    sinon.stub(service, "createPackage").returns(Result.ok<IPackageDTO>(validPackage));
    await ctrl.createPackage(<Request>req,<Response>res,<NextFunction>next)
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, sinon.match(201));
  });

  it('success createPackage: returns expected dto for valid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = validPackage;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };

    let service = new PackageService(null, null, null);
    let ctrl = new packageController(service as IPackageService);
    sinon.stub(service, "createPackage").returns(Result.ok<IPackageDTO>(validPackage));
    await ctrl.createPackage(<Request>req,<Response>res,<NextFunction>next)
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(validPackage));
  });

  it('success createPackage: returns 400 for invalid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = invalidPackage;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };

    let service = new PackageService(null, null, null);
    let ctrl = new packageController(service as IPackageService);
    sinon.stub(service, "createPackage").returns(Result.fail<IPackageDTO>(invalidPackage));
    await ctrl.createPackage(<Request>req,<Response>res,<NextFunction>next)
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, sinon.match(400));
  });

  it('createPackage: return nextFunction when exception is thrown', async function () {
    let req: Partial<Request> = {}
    req.body = validPackage;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { return true };

    let service = new PackageService(null, null, null);
    let ctrl = new packageController(service as IPackageService);
    sinon.stub(service, "createPackage").throws();
    const result = await ctrl.createPackage(<Request>req,<Response>res,<NextFunction>next)
    assert(result);
    sinon.restore();
  });

  //////////////////////////////////////////////////

  it('success updatePackage: returns 200 for valid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = validPackage;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };

    let service = new PackageService(null, null, null);
    let ctrl = new packageController(service as IPackageService);
    sinon.stub(service, "updatePackage").returns(Result.ok<IPackageDTO>(validPackage));
    await ctrl.updatePackage(<Request>req,<Response>res,<NextFunction>next)
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, sinon.match(200));
  });

  it('success updatePackage: returns expected dto for valid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = validPackage;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };

    let service = new PackageService(null, null, null);
    let ctrl = new packageController(service as IPackageService);
    sinon.stub(service, "updatePackage").returns(Result.ok<IPackageDTO>(validPackage));
    await ctrl.updatePackage(<Request>req,<Response>res,<NextFunction>next)
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(validPackage));
  });

  it('success updatePackage: returns 400 for invalid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = invalidPackage;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };

    let service = new PackageService(null, null, null);
    let ctrl = new packageController(service as IPackageService);
    sinon.stub(service, "updatePackage").returns(Result.fail<IPackageDTO>(invalidPackage));
    await ctrl.updatePackage(<Request>req,<Response>res,<NextFunction>next)
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, sinon.match(400));
  });

  it('updatePackage: return nextFunction when exception is thrown', async function () {
    let req: Partial<Request> = {}
    req.body = validPackage;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { return true };

    let service = new PackageService(null, null, null);
    let ctrl = new packageController(service as IPackageService);
    sinon.stub(service, "updatePackage").throws();
    const result = await ctrl.updatePackage(<Request>req,<Response>res,<NextFunction>next)
    assert(result);
    sinon.restore();
  });

  const expectedPackages : IPackageDTO[] = [
    {
      "packageId": "P01",
      "xCoordinate": 10,
      "yCoordinate": 11,
      "zCoordinate": 12,
      "shipmentId": "S01",
      "deliveryId": "D01",
      "pathId": "sdf4-40aa-35ut"
    }
  ]

  it('getAll: returns json with array with packages', async function () {
    let req: Partial<Request> = {};
    let body = {}
    req.body = body;

    let res: Partial<Response> = {
      status: sinon.spy(),
      json: sinon.spy()
    };

    let next: Partial<NextFunction> = () => {};

    const service : IPackageService = new PackageService(null, null, null);
    sinon.stub(service, "getAll").returns(Result.ok<IPackageDTO[]>(expectedPackages));

    const ctrl = new packageController(service as IPackageService);
    await ctrl.getAll(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status,sinon.match(200));
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(expectedPackages));
  });

})

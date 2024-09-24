import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { assert } from 'console';
import IPathRepo from "../../src/services/IRepos/IPathRepo";
import IPathService from "../../src/services/IServices/IPathService";
import IPathController from "../../src/controllers/IControllers/IPathController";
import PathRepo from "../../src/repos/pathRepo";
import PathService from "../../src/services/pathService";
import pathController from '../../src/controllers/pathController';
import {Path} from "../../src/domain/paths/path";


describe('path controller + service Integration Test', function () {

  let pathRepo: IPathRepo
  let service: IPathService
  let ctrl: IPathController

  beforeEach(function () {
    pathRepo = new PathRepo(null);
    service = new PathService(pathRepo);
    ctrl = new pathController(service);
  });

  afterEach(function () {
    sinon.restore();
  });

  const pathData = {
    expected: {
      id: "1",
      departureWarehouse: "123",
      arrivalWarehouse: "124",
      distance: 4300,
      duration: 80,
      consumedEnergy: 100,
    },
    body: {
      departureWarehouse: "123",
      arrivalWarehouse: "124",
      distance: 4300,
      duration: 80,
      consumedEnergy: 100,
    },
    createPath: () => { return Path.create(pathData.expected).getValue() },
  }

  it('Path: returns 201 for valid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = pathData.expected;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };
    const path = pathData.expected
    sinon.stub(pathRepo, "save").returns(path)
    sinon.stub(service, 'checkIfWarehousesExist').resolves
    sinon.stub(service, "checkIfAlreadyPathExists").resolves
    await ctrl.createPath(<Request>req, <Response>res, <NextFunction>next)
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, sinon.match(201));
  });

  it('Path: returns expected dto for valid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = pathData.expected;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }
    let next: Partial<NextFunction> = () => { };

    const path = pathData.expected
    sinon.stub(pathRepo, "save").returns(path)
    sinon.stub(service, 'checkIfWarehousesExist').resolves
    sinon.stub(service, "checkIfAlreadyPathExists").resolves
    await ctrl.createPath(<Request>req, <Response>res, <NextFunction>next)
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(pathData.body));
  });

  it('Path: returns bad request for invalid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = pathData.body;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };
    pathData.expected.id = ""
    sinon.stub(pathRepo, "save").returns(pathData.body)
    await ctrl.createPath(<Request>req, <Response>res, <NextFunction>next)
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, sinon.match(400));
  });

  it('Path: returns next function when exception is thrown', async function () {
    let req: Partial<Request> = {}
    req.body = pathData.expected;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { return true };
    pathData.expected.id = ""

    sinon.stub(pathRepo, "save").throws();
    const result = await ctrl.createPath(<Request>req, <Response>res, <NextFunction>next)
    assert(result)
  });
});

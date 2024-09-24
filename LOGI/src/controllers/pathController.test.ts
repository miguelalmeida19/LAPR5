import {NextFunction, Request, Response} from "express";
import IPathService from "../services/IServices/IPathService";
import {Result} from "../core/logic/Result";
import * as sinon from 'sinon';
import {assert} from "console";
import IPathDTO from "../dto/IPathDTO";
import PathService from "../services/pathService";
import pathController from "./pathController";

describe('path controller', function () {

  beforeEach(function () {
  });

  let validPath: IPathDTO = {
    id: "1",
    departureWarehouse: "123",
    arrivalWarehouse: "124",
    distance: 4300,
    duration: 80,
    consumedEnergy: 100,
  }

  it('createPath: returns 201 for valid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = validPath;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };
    let service = new PathService(null);
    let ctrl = new pathController(service as IPathService);
    sinon.stub(service, "createPath").returns(Result.ok<IPathDTO>(validPath))
    await ctrl.createPath(<Request>req,<Response>res,<NextFunction>next)
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, sinon.match(201));
  });

  it('createPath: returns expected dto for valid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = validPath;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };
    let service = new PathService(null);
    let ctrl = new pathController(service as IPathService);
    sinon.stub(service, "createPath").returns(Result.ok<IPathDTO>(validPath))
    await ctrl.createPath(<Request>req, <Response>res, <NextFunction>next)
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(validPath));
  });

  it('createPath: returns bad request for invalid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = validPath;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };
    let service = new PathService(null);
    let ctrl = new pathController(service as IPathService);
    validPath.id = ""
    sinon.stub(service, "createPath").returns(Result.fail<IPathDTO>(validPath))
    await ctrl.createPath(<Request>req, <Response>res, <NextFunction>next)
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, sinon.match(400));
  });

  it('createPath: returns next function when exception is thrown', async function () {
    let req: Partial<Request> = {}
    req.body = validPath;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }
    let next: Partial<NextFunction> = () => {return true;};
    let service = new PathService(null);
    let ctrl = new pathController(service as IPathService);
    sinon.stub(service, "createPath").throws();
    const result=await ctrl.createPath(<Request>req, <Response>res, <NextFunction>next)
    assert(result)
    sinon.restore();
  });

  it('updatePath: returns 200 for valid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = validPath;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };
    let service = new PathService(null);
    let ctrl = new pathController(service as IPathService);
    sinon.stub(service, "updatePath").returns(Result.ok<IPathDTO>(validPath))
    await ctrl.updatePath(<Request>req,<Response>res,<NextFunction>next)
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, sinon.match(200));
  });

  it('updatePath: returns expected dto for valid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = validPath;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };
    let service = new PathService(null);
    let ctrl = new pathController(service as IPathService);
    sinon.stub(service, "updatePath").returns(Result.ok<IPathDTO>(validPath))

    await ctrl.updatePath(<Request>req, <Response>res, <NextFunction>next)
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(validPath));
  });

  it('updatePath: returns bad request for invalid parameters', async function () {
    let req: Partial<Request> = {}
    req.body = validPath;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }

    let next: Partial<NextFunction> = () => { };
    let service = new PathService(null);
    let ctrl = new pathController(service as IPathService);
    validPath.id = ""
    sinon.stub(service, "updatePath").returns(Result.fail<IPathDTO>(validPath))
    await ctrl.updatePath(<Request>req, <Response>res, <NextFunction>next)
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, sinon.match(400));
  });

  it('updatePath: returns next function when exception is thrown', async function () {
    let req: Partial<Request> = {}
    req.body = validPath;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.spy(),
    }
    let next: Partial<NextFunction> = () => {return true;};
    let service = new PathService(null);
    let ctrl = new pathController(service as IPathService);
    sinon.stub(service, "updatePath").throws();
    const result=await ctrl.updatePath(<Request>req, <Response>res, <NextFunction>next)
    assert(result)
    sinon.restore();
  });

  const expectedPaths : IPathDTO[] = [
    {
      id: "1",
      departureWarehouse: "123",
      arrivalWarehouse: "124",
      distance: 4300,
      duration: 80,
      consumedEnergy: 100,
    }
  ]

  it('getAll: returns json with array with paths', async function () {

    let req: Partial<Request> = {};
    let body = {}
    req.body = body;

    let res: Partial<Response> = {
      status: sinon.spy(),
      json: sinon.spy()
    };

    let next: Partial<NextFunction> = () => {};

    const service : IPathService= new PathService(null);
    sinon.stub(service,"getAll").returns(Result.ok<IPathDTO[]>(expectedPaths));

    const ctrl = new pathController(service as IPathService);
    await ctrl.getAll(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status,sinon.match(200));
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(expectedPaths));
  });

  it('getByDepartureWarehouse: returns json with array with paths with specific departure warehouse', async function () {

    let departureWarehouse = "123";
    let req: Partial<Request> = {};
    let body = {}
    req.body = body;
    req.params={departureWarehouse:""}
    req.params.departureWarehouse = departureWarehouse;

    let res: Partial<Response> = {
      status: sinon.spy(),
      json: sinon.spy()
    };

    let next: Partial<NextFunction> = () => {};

    const service : IPathService= new PathService(null);
    sinon.stub(service,"getByDepartureWarehouse").returns(Result.ok<IPathDTO[]>(expectedPaths));

    const ctrl = new pathController(service as IPathService);
    await ctrl.getByDepartureWarehouse(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status,sinon.match(200));
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(expectedPaths));
  });

  it('getByDepartureWarehouse: returns bad request for invalid departure warehouse', async function () {


    let req: Partial<Request> = {};
    let body = {}
    req.body = body;
    req.params={departureWarehouse:""}


    let res: Partial<Response> = {
      status: sinon.spy(),
      json: sinon.spy()
    };

    let next: Partial<NextFunction> = () => {};

    const service : IPathService= new PathService(null);
    sinon.stub(service,"getByDepartureWarehouse").returns(Result.fail<IPathDTO[]>("Error"));

    const ctrl = new pathController(service as IPathService);
    await ctrl.getByDepartureWarehouse(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status,sinon.match(400));
  });

  it('getByArrivalWarehouse: returns json with array with paths with specific arrival warehouse', async function () {

    let arrivalWarehouse = "123";
    let req: Partial<Request> = {};
    let body = {}
    req.body = body;
    req.params={arrivalWarehouse:""}
    req.params.arrivalWarehouse = arrivalWarehouse;

    let res: Partial<Response> = {
      status: sinon.spy(),
      json: sinon.spy()
    };

    let next: Partial<NextFunction> = () => {};

    const service : IPathService= new PathService(null);
    sinon.stub(service,"getByArrivalWarehouse").returns(Result.ok<IPathDTO[]>(expectedPaths));

    const ctrl = new pathController(service as IPathService);
    await ctrl.getByArrivalWarehouse(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status,sinon.match(200));
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(expectedPaths));
  });

  it('getByArrivalWarehouse: returns bad request for invalid arrival warehouse', async function () {


    let req: Partial<Request> = {};
    let body = {}
    req.body = body;
    req.params={arrivalWarehouse:""}


    let res: Partial<Response> = {
      status: sinon.spy(),
      json: sinon.spy()
    };

    let next: Partial<NextFunction> = () => {};

    const service : IPathService= new PathService(null);
    sinon.stub(service,"getByArrivalWarehouse").returns(Result.fail<IPathDTO[]>("Error"));

    const ctrl = new pathController(service as IPathService);
    await ctrl.getByArrivalWarehouse(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status,sinon.match(400));
  });

  it('getByWarehouses: returns json with array with paths with specific arrival and departure warehouse', async function () {

    let departureWarehouse = "123";
    let arrivalWarehouse = "124";
    let req: Partial<Request> = {};
    let body = {}
    req.body = body;
    req.params={departureWarehouse:"",arrivalWarehouse:""}
    req.params.departureWarehouse = departureWarehouse;
    req.params.arrivalWarehouse = arrivalWarehouse;

    let res: Partial<Response> = {
      status: sinon.spy(),
      json: sinon.spy()
    };

    let next: Partial<NextFunction> = () => {};

    const service : IPathService= new PathService(null);
    sinon.stub(service,"getByWarehouses").returns(Result.ok<IPathDTO>(expectedPaths[0]));

    const ctrl = new pathController(service as IPathService);
    await ctrl.getByWarehouses(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status,sinon.match(200));
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(expectedPaths[0]));
  });

  it('getByWarehouses: returns bad request for invalid arrival warehouse', async function () {


    let req: Partial<Request> = {};
    let body = {}
    req.body = body;
    req.params={departureWarehouse:"",arrivalWarehouse:""}

    let res: Partial<Response> = {
      status: sinon.spy(),
      json: sinon.spy()
    };

    let next: Partial<NextFunction> = () => {};

    const service : IPathService= new PathService(null);
    sinon.stub(service,"getByWarehouses").returns(Result.fail<IPathDTO>("Error"));

    const ctrl = new pathController(service as IPathService);
    await ctrl.getByWarehouses(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status,sinon.match(400));
  });

});

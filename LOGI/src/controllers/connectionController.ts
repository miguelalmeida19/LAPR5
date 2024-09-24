import {Request, Response, NextFunction} from 'express';
import {Inject, Service} from 'typedi';
import config from "../../config";

import IConnectionController from "./IControllers/IConnectionController";
import IConnectionService from '../services/IServices/IConnectionService';
import IConnectionDTO from '../dto/IConnectionDTO';

import {Result} from "../core/logic/Result";

@Service()
export default class ConnectionController implements IConnectionController {
  constructor(
    @Inject(config.services.connection.name) private connectionServiceInstance: IConnectionService
  ) {
  }

  public async createConnection(req: Request, res: Response, next: NextFunction) {
    try {
      const connectionOrError = await this.connectionServiceInstance.createConnection(req.body as IConnectionDTO) as Result<IConnectionDTO>;

      if (connectionOrError.isFailure) {
        return res.status(400).send(connectionOrError.error);
      }

      const connectionDTO = connectionOrError.getValue();
      res.status(201);
      return res.json(connectionDTO);
    } catch (e) {
      return next(e);
    }
  };

  public async updateConnection(req: Request, res: Response, next: NextFunction) {
    try {
      const connectionOrError = await this.connectionServiceInstance.updateConnection(req.body as IConnectionDTO) as Result<IConnectionDTO>;

      if (connectionOrError.isFailure) {
        return res.status(400).send(connectionOrError.error);
      }

      const connectionDTO = connectionOrError.getValue();
      res.status(200);
      return res.json(connectionDTO);
    } catch (e) {
      return next(e);
    }
  };

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const connectionOrError = await this.connectionServiceInstance.getAll() as Result<IConnectionDTO[]>;

      if (connectionOrError.isFailure) {
        return res.status(400).send(connectionOrError.error);
      }

      const connectionDto = connectionOrError.getValue();

      res.status(200);
      return res.json(connectionDto);
    } catch (e) {
      return next(e);
    }
  };

  public async getConnectionById(req: Request, res: Response, next: NextFunction) {
    try {
      const connectionId = req.params.connectionId
      const connectionOrError = await this.connectionServiceInstance.getConnection(connectionId) as Result<IConnectionDTO>

      if (connectionOrError.isFailure) {
        return res.status(400).send();
      }

      const connection = connectionOrError.getValue();
      res.status(200);
      return res.json(connection);
    } catch (e) {
      return next(e);
    }
  }

}

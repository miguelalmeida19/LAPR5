import {Request, Response, NextFunction} from 'express';
import {Inject, Service} from 'typedi';
import config from "../../config";

import IPathController from "./IControllers/IPathController";
import IPathService from '../services/IServices/IPathService';

import {Result} from "../core/logic/Result";
import IPathDTO from "../dto/IPathDTO";

@Service()
export default class PathController implements IPathController {
  constructor(
    @Inject(config.services.path.name) private pathServiceInstance: IPathService
  ) {
  }

  public async createPath(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = await this.pathServiceInstance.createPath(req.body as IPathDTO) as Result<IPathDTO>;

      if (pathOrError.isFailure) {
        return res.status(400).send(pathOrError.error);
      }

      const pathDTO = pathOrError.getValue();
      res.status(201);
      return res.json(pathDTO);
    } catch (e) {
      return next(e);
    }
  };

  public async updatePath(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = await this.pathServiceInstance.updatePath(req.body as IPathDTO) as Result<IPathDTO>;

      if (pathOrError.isFailure) {
        return res.status(400).send(pathOrError.error);
      }

      const pathDTO = pathOrError.getValue();
      res.status(200);
      return res.json(pathDTO);
    } catch (e) {
      return next(e);
    }
  };

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = await this.pathServiceInstance.getAll() as Result<IPathDTO[]>;

      if (pathOrError.isFailure) {
        return res.status(400).send(pathOrError.error);
      }

      const pathDto = pathOrError.getValue();

      res.status(200);
      return res.json(pathDto);
    } catch (e) {
      return next(e);
    }
  };

  public async getByDepartureWarehouse(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = await this.pathServiceInstance.getByDepartureWarehouse(req.params.id as string) as Result<IPathDTO[]>;

      if (pathOrError.isFailure) {
        return res.status(400).send(pathOrError.error);
      }

      const pathDto = pathOrError.getValue();

      res.status(200);
      return res.json(pathDto);
    } catch (e) {
      return next(e);
    }
  }

  public async getByArrivalWarehouse(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = await this.pathServiceInstance.getByArrivalWarehouse(req.params.id as string) as Result<IPathDTO[]>;

      if (pathOrError.isFailure) {
        return res.status(400).send(pathOrError.error);
      }

      const pathDto = pathOrError.getValue();

      res.status(200);
      return res.json(pathDto);
    } catch (e) {
      return next(e);
    }
  }

  public async getByWarehouses(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = await this.pathServiceInstance.getByWarehouses(req.params.id1 as string, req.params.id2 as string) as Result<IPathDTO[]>;

      if (pathOrError.isFailure) {
        return res.status(400).send(pathOrError.error);
      }

      const pathDto = pathOrError.getValue();

      res.status(200);
      return res.json(pathDto);
    } catch (e) {
      return next(e);
    }
  }

  public async getPathById(req: Request, res: Response, next: NextFunction) {
    try {
      const pathId = req.params.pathId
      const pathOrError = await this.pathServiceInstance.getPath(pathId) as Result<IPathDTO>

      if (pathOrError.isFailure) {
        return res.status(400).send();
      }

      const path = pathOrError.getValue();
      res.status(200);
      return res.json(path);
    } catch (e) {
      return next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = await this.pathServiceInstance.getById(req.params.pathId as string) as Result<IPathDTO[]>;

      if (pathOrError.isFailure) {
        return res.status(400).send(pathOrError.error);
      }

      const pathDto = pathOrError.getValue();

      res.status(200);
      return res.json(pathDto);
    } catch (e) {
      return next(e);
    }
  }

  public async findFirstNResults(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = await this.pathServiceInstance.findFirstNResults(req.params.nResults as unknown as number, req.params.page as unknown as number) as Result<IPathDTO[]>;
      const numberOfPagesOrError = await this.pathServiceInstance.findPagesForNResults(req.params.nResults as unknown as number) as Result<number>;

      if (pathOrError.isFailure) {
        return res.status(400).send(pathOrError.error);
      }else if(numberOfPagesOrError.isFailure) {
        return res.status(400).send(numberOfPagesOrError.error);
      }

      const pathDto = pathOrError.getValue();
      const numberOfPages = numberOfPagesOrError.getValue();

      res.status(200);

      var data = {
        paths: pathDto,
        pages: numberOfPages
      };

      return res.json(data);
    } catch (e) {
      return next(e);
    }
  }
}

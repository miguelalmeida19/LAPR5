import {Request, Response, NextFunction} from 'express';
import {Inject, Service} from 'typedi';
import config from "../../config";

import ILocationController from "./IControllers/ILocationController";
import ILocationService from '../services/IServices/ILocationService';
import ILocationDTO from '../dto/ILocationDTO';

import {Result} from "../core/logic/Result";

@Service()
export default class LocationController implements ILocationController {
  constructor(
    @Inject(config.services.location.name) private locationServiceInstance: ILocationService
  ) {
  }

  public async createLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const locationOrError = await this.locationServiceInstance.createLocation(req.body as ILocationDTO) as Result<ILocationDTO>;

      if (locationOrError.isFailure) {
        return res.status(400).send(locationOrError.error);
      }

      const locationDTO = locationOrError.getValue();
      res.status(201);
      return res.json(locationDTO);
    } catch (e) {
      return next(e);
    }
  };

  public async updateLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const locationOrError = await this.locationServiceInstance.updateLocation(req.body as ILocationDTO) as Result<ILocationDTO>;

      if (locationOrError.isFailure) {
        return res.status(400).send(locationOrError.error);
      }

      const locationDTO = locationOrError.getValue();
      res.status(200);
      return res.json(locationDTO);
    } catch (e) {
      return next(e);
    }
  };

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const locationOrError = await this.locationServiceInstance.getAll() as Result<ILocationDTO[]>;

      if (locationOrError.isFailure) {
        return res.status(400).send(locationOrError.error);
      }

      const locationDto = locationOrError.getValue();

      res.status(200);
      return res.json(locationDto);
    } catch (e) {
      return next(e);
    }
  };

  public async getLocationById(req: Request, res: Response, next: NextFunction) {
    try {
      const locationId = req.params.locationId
      const locationOrError = await this.locationServiceInstance.getLocation(locationId) as Result<ILocationDTO>

      if (locationOrError.isFailure) {
        return res.status(400).send();
      }

      const location = locationOrError.getValue();
      res.status(200);
      return res.json(location);
    } catch (e) {
      return next(e);
    }
  }

}

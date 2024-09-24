import {Request, Response, NextFunction} from 'express';
import {Inject, Service} from 'typedi';
import config from "../../config";

import ITruckController from "./IControllers/ITruckController";
import ITruckService from '../services/IServices/ITruckService';
import ITruckDTO from '../dto/ITruckDTO';

import {Result} from "../core/logic/Result";

@Service()
export default class TruckController implements ITruckController {
  constructor(
    @Inject(config.services.truck.name) private truckServiceInstance: ITruckService
  ) {
  }

  public async createTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.createTruck(req.body as ITruckDTO) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(400).send(truckOrError.error);
      }

      const truckDTO = truckOrError.getValue();
      res.status(201);
      return res.json(truckDTO);
    } catch (e) {

      return next(e);
    }
  };

  public async updateTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.updateTruck(req.body as ITruckDTO) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(400).send(truckOrError.error);
      }

      const truckDTO = truckOrError.getValue();
      res.status(200);
      return res.json(truckDTO);
    } catch (e) {
      return next(e);
    }
  };

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.getAll() as Result<ITruckDTO[]>;

      if (truckOrError.isFailure) {
        return res.status(400).send(truckOrError.error);
      }

      const truckDto = truckOrError.getValue();

      res.status(200);
      return res.json(truckDto);
    } catch (e) {
      return next(e);
    }
  };

  public async getTruckById(req: Request, res: Response, next: NextFunction) {
    try {
      const truckId = req.params.truckId
      const truckOrError = await this.truckServiceInstance.getTruck(truckId) as Result<ITruckDTO>

      if (truckOrError.isFailure) {
        return res.status(400).send();
      }

      const truck = truckOrError.getValue();
      res.status(200);
      return res.json(truck);
    } catch (e) {
      return next(e);
    }
  }
  public async deactivateTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckId = req.body.truckId
      const truckOrError = await this.truckServiceInstance.deactivateTruck(truckId) as Result<ITruckDTO>

      if (req.method !== 'PATCH') {
        return res.status(405).send();
      }

      if (truckOrError.isFailure) {
        return res.status(400).send();
      }

      const truck = truckOrError.getValue();
      res.status(200);
      return res.json(truck);
    } catch (e) {
      return next(e);
    }
  }
  public async activateTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckId = req.body.truckId
      const truckOrError = await this.truckServiceInstance.activateTruck(truckId) as Result<ITruckDTO>

      if (req.method !== 'PATCH') {
        return res.status(405).send();
      }

      if (truckOrError.isFailure) {
        return res.status(400).send();
      }

      const truck = truckOrError.getValue();
      res.status(200);
      return res.json(truck);
    } catch (e) {
      return next(e);
    }
  }



}

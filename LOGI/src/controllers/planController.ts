import {Request, Response, NextFunction} from 'express';
import {Inject, Service} from 'typedi';
import config from "../../config";

import IPlanController from "./IControllers/IPlanController";
import IPlanService from '../services/IServices/IPlanService';

import {Result} from "../core/logic/Result";
import IPlanDTO from "../dto/IPlanDTO";

@Service()
export default class PlanController implements IPlanController {
  constructor(
    @Inject(config.services.plan.name) private planServiceInstance: IPlanService
  ) {
  }

  public async getSimulatedNumberOfTrucks(req: Request, res: Response, next: NextFunction) {
    try {
      const planOrError = await this.planServiceInstance.getSimulatedTruckWarehouses() as Result<number[]>

      if (planOrError.isFailure) {
        return res.status(400).send();
      }

      const plan = planOrError.getValue();

      let body = {"numberOfTrucks": plan.length, "plan": plan};

      res.status(200);
      return res.json(body);
    } catch (e) {
      return next(e);
    }
  }

  public async getNumberOfTrucks(req: Request, res: Response, next: NextFunction) {
    try {
      const planOrError = await this.planServiceInstance.getTruckWarehouses() as Result<number[]>

      if (planOrError.isFailure) {
        return res.status(400).send();
      }

      const plan = planOrError.getValue();

      let body = {"numberOfTrucks": plan.length, "plan": plan};

      res.status(200);
      return res.json(body);
    } catch (e) {
      return next(e);
    }
  }

  public async getTruckTime(req: Request, res: Response, next: NextFunction) {
    try {
      const planOrError = await this.planServiceInstance.getTruckTime(req.body as IPlanDTO) as Result<{Z: number, H: number[]}>;

      if (planOrError.isFailure) {
        return res.status(400).send(planOrError.error);
      }

      const planDTO = planOrError.getValue();
      res.status(200);
      return res.json(planDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getSimulateTruckTime(req: Request, res: Response, next: NextFunction) {
    try {
      const planOrError = await this.planServiceInstance.getSimulatedTruckTime(req.body as IPlanDTO) as Result<{Z: number, H: number[]}>;

      if (planOrError.isFailure) {
        return res.status(400).send(planOrError.error);
      }

      const planDTO = planOrError.getValue();
      res.status(200);
      return res.json(planDTO);
    } catch (e) {
      return next(e);
    }
  }

}

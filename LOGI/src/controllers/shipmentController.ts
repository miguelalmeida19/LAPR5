import {Request, Response, NextFunction} from 'express';
import {Inject, Service} from 'typedi';
import config from "../../config";

import {Result} from "../core/logic/Result";
import IShipmentController from "./IControllers/IShipmentController";
import IShipmentService from "../services/IServices/IShipmentService";
import IShipmentDTO from "../dto/IShipmentDTO";

@Service()
export default class ShipmentController implements IShipmentController {
  constructor(
    @Inject(config.services.shipment.name) private shipmentServiceInstance: IShipmentService
  ) {
  }

  public async createShipment(req: Request, res: Response, next: NextFunction) {
    try {
      const shipmentOrError = await this.shipmentServiceInstance.createShipment(req.body as IShipmentDTO) as Result<IShipmentDTO>;

      if (shipmentOrError.isFailure) return res.status(400).send(shipmentOrError.error);

      const shipmentDTO = shipmentOrError.getValue();
      res.status(201);

      return res.json(shipmentDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async updateShipment(req: Request, res: Response, next: NextFunction) {
    try {
      const shipmentOrError = await this.shipmentServiceInstance.updateShipment(req.body as IShipmentDTO) as Result<IShipmentDTO>;

      if (shipmentOrError.isFailure) return res.status(400).send(shipmentOrError.error);

      const shipmentDTO = shipmentOrError.getValue();
      res.status(200);

      return res.json(shipmentDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const shipmentOrError = await this.shipmentServiceInstance.getAll() as Result<IShipmentDTO[]>;

      if (shipmentOrError.isFailure) return res.status(400).send(shipmentOrError.error);

      const shipmentDTO = shipmentOrError.getValue();
      res.status(200);

      return res.json(shipmentDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const shipmentOrError = await this.shipmentServiceInstance.getById(req.params.shipmentId as string) as Result<IShipmentDTO[]>;

      if (shipmentOrError.isFailure) return res.status(400).send(shipmentOrError.error);

      const shipmentDTO = shipmentOrError.getValue();
      res.status(200);

      return res.json(shipmentDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getShipment(req: Request, res: Response, next: NextFunction) {
    try {
      const shipmentId = req.params.shipmentId;
      const shipmentOrError = await this.shipmentServiceInstance.getShipment(shipmentId) as Result<IShipmentDTO>;

      if (shipmentOrError.isFailure) return res.status(400).send(shipmentOrError.error);

      const shipmentDTO = shipmentOrError.getValue();
      res.status(200);

      return res.json(shipmentDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getByTruckId(req: Request, res: Response, next: NextFunction) {
    try {
      const shipmentOrError = await this.shipmentServiceInstance.getByTruckId(req.params.id as string) as Result<IShipmentDTO[]>;

      if (shipmentOrError.isFailure) return res.status(400).send(shipmentOrError.error);

      const shipmentDTO = shipmentOrError.getValue();
      res.status(200);

      return res.json(shipmentDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async findFirstNResults(req: Request, res: Response, next: NextFunction) {
    try {
      const shipmentOrError = await this.shipmentServiceInstance
        .findFirstNResults(req.params.nResults as unknown as number, req.params.page as unknown as number) as Result<IShipmentDTO[]>;
      const numberOfPagesOrError = await this.shipmentServiceInstance
        .findPagesForNResults(req.params.nResults as unknown as number) as Result<number>;

      if (shipmentOrError.isFailure) return res.status(400).send(shipmentOrError.error);
      else if (numberOfPagesOrError.isFailure) return res.status(400).send(numberOfPagesOrError.error);

      const shipmentDTO = shipmentOrError.getValue();
      const numberOfPages = numberOfPagesOrError.getValue();

      res.status(200);

      var data = {
        paths: shipmentDTO,
        pages: numberOfPages
      };

      return res.json(data);
    } catch (e) {
      return next(e);
    }
  }

}

import {Request, Response, NextFunction} from 'express';
import {Inject, Service} from 'typedi';
import config from "../../config";

import {Result} from "../core/logic/Result";
import IPackageController from "./IControllers/IPackageController";
import IPackageService from "../services/IServices/IPackageService";
import IPackageDTO from "../dto/IPackageDTO";
import IPathDTO from "../dto/IPathDTO";

@Service()
export default class PackageController implements IPackageController {
  constructor(
    @Inject(config.services.package.name) private packageServiceInstance: IPackageService
  ) {}

  public async createPackage(req: Request, res: Response, next: NextFunction) {
    try {
      const packageOrError = await this.packageServiceInstance.createPackage(req.body as IPackageDTO) as Result<IPackageDTO>;
      if (packageOrError.isFailure) return res.status(400).send(packageOrError.error);

      const packageDTO = packageOrError.getValue();
      res.status(201);

      return res.json(packageDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async updatePackage(req: Request, res: Response, next: NextFunction) {
    try {
      const packageOrError = await this.packageServiceInstance.updatePackage(req.body as IPackageDTO) as Result<IPackageDTO>;
      if (packageOrError.isFailure) return res.status(400).send(packageOrError.error);

      const packageDTO = packageOrError.getValue();
      res.status(200);

      return res.json(packageDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const packageOrError = await this.packageServiceInstance.getAll() as Result<IPackageDTO[]>;
      if (packageOrError.isFailure) return res.status(400).send(packageOrError.error);

      const packageDTO = packageOrError.getValue();
      res.status(200);

      return res.json(packageDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const packageOrError = await this.packageServiceInstance.getById(req.params.packageId as string) as Result<IPackageDTO[]>;
      if (packageOrError.isFailure) return res.status(400).send(packageOrError.error);

      const packageDTO = packageOrError.getValue();
      res.status(200);

      return res.json(packageDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getPackageById(req: Request, res: Response, next: NextFunction) {
    try {
      const packageId = req.params.packageId;
      const packageOrError = await this.packageServiceInstance.getPackage(packageId) as Result<IPackageDTO>;
      if (packageOrError.isFailure) return res.status(400).send(packageOrError.error);

      const packageDTO = packageOrError.getValue();
      res.status(200);

      return res.json(packageDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getByDelivery(req: Request, res: Response, next: NextFunction) {
    try {
      const packageOrError = await this.packageServiceInstance.getByDeliveryId(req.params.id as string) as Result<IPackageDTO>;
      if (packageOrError.isFailure) return res.status(400).send(packageOrError.error);

      const packageDTO = packageOrError.getValue();
      res.status(200);

      return res.json(packageDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getByShipment(req: Request, res: Response, next: NextFunction) {
    try {
      const packageOrError = await this.packageServiceInstance.getByShipmentId(req.params.id as string) as Result<IPackageDTO[]>;
      if (packageOrError.isFailure) return res.status(400).send(packageOrError.error);

      const packageDTO = packageOrError.getValue();
      res.status(200);

      return res.json(packageDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getByPath(req: Request, res: Response, next: NextFunction) {
    try {
      const packageOrError = await this.packageServiceInstance.getByPathId(req.params.id as string) as Result<IPackageDTO[]>;
      if (packageOrError.isFailure) return res.status(400).send(packageOrError.error);

      const packageDTO = packageOrError.getValue();
      res.status(200);

      return res.json(packageDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async findFirstNResults(req: Request, res: Response, next: NextFunction) {
    try {
      const packageOrError = await this.packageServiceInstance
        .findFirstNResults(req.params.nResults as unknown as number, req.params.page as unknown as number) as Result<IPackageDTO[]>;
      const numberOfPagesOrError = await this.packageServiceInstance
        .findPagesForNResults(req.params.nResults as unknown as number) as Result<number>;

      if (packageOrError.isFailure) return res.status(400).send(packageOrError.error);
      else if (numberOfPagesOrError.isFailure) return res.status(400).send(numberOfPagesOrError.error);

      const packageDTO = packageOrError.getValue();
      const numberOfPages = numberOfPagesOrError.getValue();

      res.status(200);

      var data = {
        paths: packageDTO,
        pages: numberOfPages
      };

      return res.json(data);
    } catch (e) {
      return next(e);
    }
  }

}

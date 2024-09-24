import { Request, Response, NextFunction } from 'express';

export default interface IPackageController {
  createPackage(req: Request, res: Response, next: NextFunction);
  updatePackage(req: Request, res: Response, next: NextFunction);
  getAll(req: Request, res: Response, next: NextFunction);
  getPackageById(req: Request, res: Response, next: NextFunction);
  getById(req: Request, res: Response, next: NextFunction);
  getByShipment(req: Request, res: Response, next: NextFunction);
  getByDelivery(req: Request, res: Response, next: NextFunction);
  getByPath(req: Request, res: Response, next: NextFunction);
  findFirstNResults(req: Request, res: Response, next: NextFunction);
}

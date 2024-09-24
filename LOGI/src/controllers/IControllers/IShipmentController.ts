import {Request, Response, NextFunction} from "express";

export default interface IShipmentController {
  createShipment(req: Request, res: Response, next: NextFunction);
  updateShipment(req: Request, res: Response, next: NextFunction);
  getAll(req: Request, res: Response, next: NextFunction);
  getShipment(req: Request, res: Response, next: NextFunction);
  getById(req: Request, res: Response, next: NextFunction);
  getByTruckId(req: Request, res: Response, next: NextFunction);
  findFirstNResults(req: Request, res: Response, next: NextFunction);
}

import { Request, Response, NextFunction } from 'express';

export default interface ITruckController  {
  createTruck(req: Request, res: Response, next: NextFunction);
  getTruckById(req: Request, res: Response, next: NextFunction);
  deactivateTruck(req: Request, res: Response, next: NextFunction);
  activateTruck(req: Request, res: Response, next: NextFunction);
  updateTruck(req: Request, res: Response, next: NextFunction);
  getAll( req: Request, res: Response, next: NextFunction);
}

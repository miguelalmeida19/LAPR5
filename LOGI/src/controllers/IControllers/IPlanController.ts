import { Request, Response, NextFunction } from 'express';

export default interface IPlanController  {
  getTruckTime(req: Request, res: Response, next: NextFunction);
  getSimulateTruckTime(req: Request, res: Response, next: NextFunction);
  getNumberOfTrucks(req: Request, res: Response, next: NextFunction);
  getSimulatedNumberOfTrucks(req: Request, res: Response, next: NextFunction);
}

import { Request, Response, NextFunction } from 'express';

export default interface ILocationController  {
  createLocation(req: Request, res: Response, next: NextFunction);
  getLocationById(req: Request, res: Response, next: NextFunction);
  updateLocation(req: Request, res: Response, next: NextFunction);
  getAll( req: Request, res: Response, next: NextFunction);
}

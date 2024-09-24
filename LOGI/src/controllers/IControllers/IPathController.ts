import { Request, Response, NextFunction } from 'express';

export default interface IPathController  {
  createPath(req: Request, res: Response, next: NextFunction);
  updatePath(req: Request, res: Response, next: NextFunction);
  getAll( req: Request, res: Response, next: NextFunction);
  getPathById(req: Request, res: Response, next: NextFunction);
  getById(req: Request, res: Response, next: NextFunction);
  findFirstNResults(req: Request, res: Response, next: NextFunction);
  getByDepartureWarehouse( req: Request, res: Response, next: NextFunction);
  getByArrivalWarehouse( req: Request, res: Response, next: NextFunction);
  getByWarehouses( req: Request, res: Response, next: NextFunction);
}

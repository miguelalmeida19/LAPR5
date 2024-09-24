import { Request, Response, NextFunction } from 'express';

export default interface IConnectionController  {
  createConnection(req: Request, res: Response, next: NextFunction);
  getConnectionById(req: Request, res: Response, next: NextFunction);
  updateConnection(req: Request, res: Response, next: NextFunction);
  getAll( req: Request, res: Response, next: NextFunction);
}

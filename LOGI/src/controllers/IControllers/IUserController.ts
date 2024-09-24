import { Request, Response, NextFunction } from 'express';

export default interface IUserController  {
  getAll( req: Request, res: Response, next: NextFunction);
  cancelAccount( req: Request, res: Response, next: NextFunction);
}

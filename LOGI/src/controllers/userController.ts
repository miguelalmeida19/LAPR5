import {Response, Request, NextFunction} from 'express';

import {Container, Inject, Service} from 'typedi';

import config from '../../config';

import IUserRepo from '../services/IRepos/IUserRepo';

import { UserMap } from "../mappers/UserMap";
import { IUserDTO } from '../dto/IUserDTO';
import IUserController from "./IControllers/IUserController";
import IUserService from "../services/IServices/IUserService";
import {Result} from "../core/logic/Result";

@Service()
export default class UserController implements IUserController {
  constructor(
    @Inject(config.services.user.name) private userServiceInstance: IUserService
  ) {
  }

  public async cancelAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = await this.userServiceInstance.cancelAccount(req.body.email) as Result<IUserDTO>;

      if (userOrError.isFailure) {
        return res.status(402).send();
      }

      return res.json({ message: "User account canceled successfully" }).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = await this.userServiceInstance.getAll() as Result<IUserDTO[]>;

      if (userOrError.isFailure) {
        return res.status(400).send(userOrError.error);
      }

      const userDto = userOrError.getValue();

      res.status(200);
      return res.json(userDto);
    } catch (e) {
      return next(e);
    }
  };

}

exports.getMe = async function(req, res: Response) {

    // NB: a arquitetura ONION não está a ser seguida aqui

    const userRepo = Container.get(config.repos.user.name) as IUserRepo

    if( !req.token || req.token == undefined )
        return res.json( new Error("Token inexistente ou inválido")).status(401);

    const user = await userRepo.findById( req.token.id );
    if (!user)
        return res.json( new Error("Utilizador não registado")).status(401);

    const userDTO = UserMap.toDTO( user ) as IUserDTO;
    return res.json( userDTO ).status(200);
}

import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IRoleController from "./IControllers/IRoleController";
import IRoleService from '../services/IServices/IRoleService';
import { Result } from "../core/logic/Result";
import IRoleDTO from "../dto/IRoleDTO";
import ITruckDTO from "../dto/ITruckDTO";

@Service()
export default class RoleController implements IRoleController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.role.name) private roleServiceInstance : IRoleService
  ) {}

  public async createRole(req: Request, res: Response, next: NextFunction) {
    try {
      const roleOrError = await this.roleServiceInstance.createRole(req.body as IRoleDTO) as Result<IRoleDTO>;

      if (roleOrError.isFailure) {
        return res.status(402).send();
      }

      const roleDTO = roleOrError.getValue();
      return res.json( roleDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const roleOrError = await this.roleServiceInstance.updateRole(req.body as IRoleDTO) as Result<IRoleDTO>;

      if (roleOrError.isFailure) {
        return res.status(404).send();
      }

      const roleDTO = roleOrError.getValue();
      return res.status(201).json( roleDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const roleOrError = await this.roleServiceInstance.getAll() as Result<IRoleDTO[]>;

      if (roleOrError.isFailure) {
        return res.status(400).send(roleOrError.error);
      }

      const roleDto = roleOrError.getValue();

      res.status(200);
      return res.json(roleDto);
    } catch (e) {
      return next(e);
    }
  };

  public async getRoleByName(req: Request, res: Response, next: NextFunction) {
    try {
      const name = req.params.roleName
      const roleOrError = await this.roleServiceInstance.getRoleByName(name) as Result<IRoleDTO>

      if (roleOrError.isFailure) {
        return res.status(400).send();
      }

      const role = roleOrError.getValue();
      res.status(200);
      return res.json(role);
    } catch (e) {
      return next(e);
    }
  }
}

import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRoleController from '../../controllers/IControllers/IRoleController';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/roles', route);

  const ctrl = Container.get(config.controllers.role.name) as IRoleController;

  route.get('/:roleName',
    celebrate({
      params: Joi.object({
        roleName: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.getRoleByName(req, res, next));

  route.get('',
    (req, res, next) => ctrl.getAll(req, res, next));

  route.post('',
    celebrate({
      body: Joi.object({
        name: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createRole(req, res, next) );

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.updateRole(req, res, next) );
};

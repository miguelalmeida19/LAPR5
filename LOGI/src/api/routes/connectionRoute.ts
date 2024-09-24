import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';

import {Container} from 'typedi';

import config from "../../../config";
import IConnectionController from "../../controllers/IControllers/IConnectionController";

const route = Router();

export default (app: Router) => {
  app.use('/connections', route);

  console.log(config.controllers.connection.name)

  const ctrl = Container.get(config.controllers.connection.name) as IConnectionController;

  route.post('',
    celebrate({
      body: Joi.object({
        connectionId: Joi.string().required(),
        cityX: Joi.number().required(),
        cityY: Joi.number().required(),
        width: Joi.number().required()
      })
    }),
    (req, res, next) => ctrl.createConnection(req, res, next));

  route.put('',
    celebrate({
      body: Joi.object({
        connectionId: Joi.string().required(),
        cityX: Joi.number().required(),
        cityY: Joi.number().required(),
        width: Joi.number().required()
      }),
    }),
    (req, res, next) => ctrl.updateConnection(req, res, next));

  route.get('',
    (req, res, next) => ctrl.getAll(req, res, next));

  route.get('/:connectionId',
    celebrate({
      params: Joi.object({
        connectionId: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.getConnectionById(req, res, next));
};

import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';

import {Container} from 'typedi';

import config from "../../../config";
import ILocationController from "../../controllers/IControllers/ILocationController";

const route = Router();

export default (app: Router) => {
  app.use('/locations', route);

  console.log(config.controllers.location.name)

  const ctrl = Container.get(config.controllers.location.name) as ILocationController;

  route.post('',
    celebrate({
      body: Joi.object({
        locationId: Joi.string().required(),
        name: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        altitude: Joi.number().required(),
        warehouseOrientation: Joi.number().required(),
        warehouseModelUrl: Joi.string().required(),
        nodeRadius: Joi.number().required()
      })
    }),
    (req, res, next) => ctrl.createLocation(req, res, next));

  route.put('',
    celebrate({
      body: Joi.object({
        locationId: Joi.string().required(),
        name: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        altitude: Joi.number().required(),
        warehouseOrientation: Joi.number().required(),
        warehouseModelUrl: Joi.string().required(),
        nodeRadius: Joi.number().required()
      }),
    }),
    (req, res, next) => ctrl.updateLocation(req, res, next));

  route.get('',
    (req, res, next) => ctrl.getAll(req, res, next));

  route.get('/:locationId',
    celebrate({
      params: Joi.object({
        locationId: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.getLocationById(req, res, next));
};

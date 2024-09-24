import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';

import {Container} from 'typedi';

import config from "../../../config";
import ITruckController from "../../controllers/IControllers/ITruckController";

const route = Router();

export default (app: Router) => {
  app.use('/trucks', route);

  const ctrl = Container.get(config.controllers.truck.name) as ITruckController;

  route.post('',
    celebrate({
      body: Joi.object({
        truckId: Joi.string().required(),
        tare: Joi.number().required(),
        capacity: Joi.number().required(),
        batteryCharge: Joi.number().required(),
        autonomy: Joi.number().required(),
        rechargeBattery: Joi.number().required(),
        active: Joi.boolean().default(true),
      })
    }),
    (req, res, next) => ctrl.createTruck(req, res, next));

  route.put('',
    celebrate({
      body: Joi.object({
        truckId: Joi.string().required(),
        tare: Joi.number().required(),
        capacity: Joi.number().required(),
        batteryCharge: Joi.number().required(),
        autonomy: Joi.number().required(),
        rechargeBattery: Joi.number().required(),
        active: Joi.boolean().default(true),
      }),
    }),
    (req, res, next) => ctrl.updateTruck(req, res, next));

  route.get('',
    (req, res, next) => ctrl.getAll(req, res, next));

  route.get('/:truckId',
    celebrate({
      params: Joi.object({
        truckId: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.getTruckById(req, res, next));

  route.patch('/deactivate',
    celebrate({
      body: Joi.object({
        truckId: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.deactivateTruck(req, res, next));
  route.patch('/activate',
    celebrate({
      body: Joi.object({
        truckId: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.activateTruck(req, res, next));


  };

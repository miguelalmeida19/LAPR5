import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';

import {Container} from 'typedi';

import config from "../../../config";
import IPlanController from "../../controllers/IControllers/IPlanController";

const route = Router();

export default (app: Router) => {
  app.use('/plan', route);

  console.log(config.controllers.plan.name)

  const ctrl = Container.get(config.controllers.plan.name) as IPlanController;

  route.post('/generate/sublist',
    celebrate({
      body: Joi.object({
        ng: Joi.number().required(),
        dp: Joi.number().required(),
        p1: Joi.number().required(),
        p2: Joi.number().required(),
        truck1: Joi.array().items(Joi.number()).required(),
      })
    }),
    (req, res, next) => ctrl.getTruckTime(req, res, next));

  route.post('/simulate/generate/sublist',
    celebrate({
      body: Joi.object({
        truck1: Joi.array().items(Joi.number()).required(),
      })
    }),
    (req, res, next) => ctrl.getSimulateTruckTime(req, res, next));

  route.get('/trucks',
    (req, res, next) => ctrl.getNumberOfTrucks(req, res, next));

  route.get('/simulate/trucks',
    (req, res, next) => ctrl.getSimulatedNumberOfTrucks(req, res, next));
};

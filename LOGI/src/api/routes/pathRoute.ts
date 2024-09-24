import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';

import {Container} from 'typedi';

import config from "../../../config";
import IPathController from "../../controllers/IControllers/IPathController";

const route = Router();

export default (app: Router) => {
  app.use('/paths', route);

  const ctrl = Container.get(config.controllers.path.name) as IPathController;

  route.post('',
    celebrate({
      body: Joi.object({
        departureWarehouse: Joi.string().required(),
        arrivalWarehouse: Joi.string().required(),
        distance: Joi.number().required(),
        duration: Joi.number().required(),
        consumedEnergy: Joi.number().required()
      })
    }),
    (req, res, next) => ctrl.createPath(req, res, next));

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        departureWarehouse: Joi.string().required(),
        arrivalWarehouse: Joi.string().required(),
        distance: Joi.number().required(),
        duration: Joi.number().required(),
        consumedEnergy: Joi.number().required()
      }),
    }),
    (req, res, next) => ctrl.updatePath(req, res, next));

  route.get('',
    (req, res, next) => ctrl.getAll(req, res, next));

  route.get('/id/:pathId',
    celebrate({
      params: Joi.object({
        pathId: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.getById(req, res, next));


  route.get('/n/:nResults/p/:page',
    celebrate({
      params: Joi.object({
        nResults: Joi.number().required(),
        page: Joi.number().required(),
      })
    }),
    (req, res, next) => ctrl.findFirstNResults(req, res, next));


  route.get('/:pathId',
    celebrate({
      params: Joi.object({
        pathId: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.getPathById(req, res, next));

  route.get("/departureWarehouse/:id", (req, res, next) => ctrl.getByDepartureWarehouse(req, res, next));

  route.get("/arrivalWarehouse/:id", (req, res, next) => ctrl.getByArrivalWarehouse(req, res, next));

  route.get("/departureWarehouse/:id1/arrivalWarehouse/:id2", (req, res, next) => ctrl.getByWarehouses(req, res, next));

};

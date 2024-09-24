import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';
import {Container} from 'typedi';

import config from "../../../config";
import IPackageController from "../../controllers/IControllers/IPackageController";

const route = Router();

export default (app: Router) => {
  app.use('/packages', route);

  const ctrl = Container.get(config.controllers.package.name) as IPackageController;

  route.post('',
    celebrate({
      body: Joi.object({
        packageId: Joi.string().required(),
        xCoordinate: Joi.number().required(),
        yCoordinate: Joi.number().required(),
        zCoordinate: Joi.number().required(),
        shipmentId: Joi.string().required(),
        deliveryId: Joi.string().required(),
        pathId: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createPackage(req, res, next));

  route.put('',
    celebrate({
      body: Joi.object({
        packageId: Joi.string().required(),
        xCoordinate: Joi.number().required(),
        yCoordinate: Joi.number().required(),
        zCoordinate: Joi.number().required(),
        shipmentId: Joi.string().required(),
        deliveryId: Joi.string().required(),
        pathId: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.updatePackage(req, res, next));

  route.get('',
    (req, res, next) => ctrl.getAll(req, res, next));

  route.get('/id/:packageId',
    celebrate({
      params: Joi.object({
        packageId: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.getById(req, res, next));

  route.get('/:packageId',
    celebrate({
      params: Joi.object({
        packageId: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.getPackageById(req, res, next));

  route.get("/shipmentId/:id",
    (req, res, next) => ctrl.getByShipment(req, res, next));

  route.get("/deliveryId/:id",
    (req, res, next) => ctrl.getByDelivery(req, res, next));

  route.get("/pathId/:id",
    (req, res, next) => ctrl.getByPath(req, res, next));

  route.get('/n/:nResults/p/:page',
    celebrate({
      params: Joi.object({
        nResults: Joi.number().required(),
        page: Joi.number().required(),
      })
    }),
    (req, res, next) => ctrl.findFirstNResults(req, res, next));

}

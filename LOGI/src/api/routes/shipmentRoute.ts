import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';
import {Container} from 'typedi';

import config from "../../../config";
import IShipmentController from "../../controllers/IControllers/IShipmentController";

const route = Router();

export default (app: Router) => {
  app.use('/shipments', route);

  const ctrl = Container.get(config.controllers.shipment.name) as IShipmentController;

  route.post('',
    celebrate({
      body: Joi.object({
        shipmentId: Joi.string().required(),
        truckId: Joi.string().required(),
        toBeDeliveredDay: Joi.number().required(),
        toBeDeliveredMonth: Joi.number().required(),
        toBeDeliveredYear: Joi.number().required()
      })
    }), (req, res, next) => ctrl.createShipment(req, res, next));

  route.put('',
    celebrate({
      body: Joi.object({
        shipmentId: Joi.string().required(),
        truckId: Joi.string().required(),
        toBeDeliveredDay: Joi.number().required(),
        toBeDeliveredMonth: Joi.number().required(),
        toBeDeliveredYear: Joi.number().required()
      })
    }), (req, res, next) => ctrl.updateShipment(req, res, next));

  route.get('',
    (req, res, next) => ctrl.getAll(req, res, next));

  route.get('/id/:shipmentId',
    celebrate({
      params: Joi.object({
        shipmentId: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.getById(req, res, next));

  route.get('/:shipmentId',
    celebrate({
      params: Joi.object({
        shipmentId: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.getShipment(req, res, next));

  route.get('/:shipmentId',
    celebrate({
      params: Joi.object({
        shipmentId: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.getShipment(req, res, next));

  route.get("/truckId/:id",
    (req, res, next) => ctrl.getByTruckId(req, res, next));

  route.get('/n/:nResults/p/:page',
    celebrate({
      params: Joi.object({
        nResults: Joi.number().required(),
        page: Joi.number().required(),
      })
    }),
    (req, res, next) => ctrl.findFirstNResults(req, res, next));
};

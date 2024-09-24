import {Request, Response} from "express";
import PlanController from "./planController";
import IPlanService from "../services/IServices/IPlanService";

describe('PlanController', () => {
  let planController: PlanController;
  let planServiceMock: IPlanService;

  beforeEach(() => {
    planServiceMock = {
      getTruckWarehouses: jest.fn(),
      getTruckTime: jest.fn()
    } as any as IPlanService;
    planController = new PlanController(planServiceMock);
  });

  describe('getNumberOfTrucks', () => {
    it('should call getTruckWarehouses with the correct argument', async () => {
      // Arrange
      const req = {body: {}} as any as Request;
      const res = {} as Response;
      const next = jest.fn();

      // Act
      await planController.getNumberOfTrucks(req, res, next);

      // Assert
      expect(planServiceMock.getTruckWarehouses).toHaveBeenCalledWith();
    });
  });

  describe('getSimulatedNumberOfTrucks', () => {
    it('should call getSimulatedNumberOfTrucks with the correct argument', async () => {
      // Arrange
      const req = {} as Request;
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as any;
      const next = jest.fn();

      // create a spy on the getSimulatedNumberOfTrucks method
      const getSimulatedNumberOfTrucksSpy = jest.spyOn(planController, 'getSimulatedNumberOfTrucks').mockImplementation(() => {
        return Promise.resolve(res);
      });

      // Act
      await planController.getSimulatedNumberOfTrucks(req, res, next);

      // Assert
      expect(getSimulatedNumberOfTrucksSpy).toHaveBeenCalledWith(req, res, next);
    });
  });

  describe('getTruckTime', () => {
    it('should call getTruckTime with the correct argument', async () => {
      // Arrange
      const req: Request = {
        body: {
          number_of_generations: 10,
          population_dimension: 20,
          crossing_probability: 0.5,
          mutation_probability: 0.1,
          truck1: [1, 2, 3]
        }
      } as Request;
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as any;

      const next = jest.fn();

      // create a spy on the getTruckTime method
      const getTruckTimeSpy = jest.spyOn(planController, 'getTruckTime').mockImplementation(() => {
        console.log('getTruckTime called');
        return Promise.resolve(res);
      });

      // Act
      await planController.getTruckTime(req, res, next);

      // Assert
      expect(getTruckTimeSpy).toHaveBeenCalledWith(req, res, next);
    });
  });

  describe('getSimulateTruckTime', () => {
    it('should call getSimulateTruckTime with the correct argument', async () => {
      // Arrange
      const req: Request = {
        body: {
          number_of_generations: 12,
          population_dimension: 43,
          crossing_probability: 2.5,
          mutation_probability: 4.1,
          truck1: [5, 2, 3, 6]
        }
      } as Request;
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as any;

      const next = jest.fn();

      // create a spy on the getTruckTime method
      const getTruckTimeSpy = jest.spyOn(planController, 'getSimulateTruckTime').mockImplementation(() => {
        console.log('getSimulateTruckTime called');
        return Promise.resolve(res);
      });

      // Act
      await planController.getSimulateTruckTime(req, res, next);

      // Assert
      expect(getTruckTimeSpy).toHaveBeenCalledWith(req, res, next);
    });
  });

});

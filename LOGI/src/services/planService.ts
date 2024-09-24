import {Service, Inject} from 'typedi';
import config from "../../config";
import IPlanDTO from '../dto/IPlanDTO';
import IPlanRepo from '../services/IRepos/IPlanRepo';
import IPlanService from './IServices/IPlanService';
import {Result} from "../core/logic/Result";

@Service()
export default class PlanService implements IPlanService {
  constructor(
    @Inject(config.repos.plan.name) private planRepo: IPlanRepo
  ) {
  }

  public async getSimulatedTruckWarehouses(): Promise<Result<number[]>> {
    try {
      const warehouses = await this.planRepo.getSimulatedTruckWarehouses();
      return Result.ok(warehouses);
    } catch (error) {
      return Result.fail<number[]>("Error getting simulated truck warehouses");
    }
  }

  public async getTruckWarehouses(): Promise<Result<number[]>> {
    try {
      const warehouses = await this.planRepo.getTruckWarehouses();
      return Result.ok(warehouses);
    } catch (error) {
      return Result.fail<number[]>("Error getting truck warehouses");
    }
  }

  public async getTruckTime(planDTO: IPlanDTO): Promise<Result<{Z: number, H: number[]}>> {
    try {
      const response = await this.planRepo.getTruckTime(planDTO);
      return Result.ok({Z: parseFloat(response['Z']), H: response['H']});
    } catch (error) {
      return Result.fail<{Z: number, H: number[]}>("Error getting truck time"); // Add an error message here
    }
  }

  public async getSimulatedTruckTime(planDTO: IPlanDTO): Promise<Result<{Z: number, H: number[]}>> {
    try {
      const response = await this.planRepo.getSimulatedTruckTime(planDTO);
      return Result.ok({Z: parseFloat(response['Z']), H: response['H']});
    } catch (error) {
      return Result.fail<{Z: number, H: number[]}>("Error getting truck simulated time");
    }
  }

}

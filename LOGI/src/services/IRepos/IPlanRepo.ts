import {Repo} from "../../core/infra/Repo";
import {Plan} from "../../domain/plan/plan";
import IPlanDTO from "../../dto/IPlanDTO";

export default interface IPlanRepo extends Repo<Plan> {
  getTruckTime(planDTO: IPlanDTO): Promise<string>;

  getSimulatedTruckTime(planDTO: IPlanDTO): Promise<{ H: number[]; Z: string }>;

  getTruckWarehouses(): Promise<number[]>;

  getSimulatedTruckWarehouses(): Promise<number[]>;

}

import { Result } from "../../core/logic/Result";
import IPlanDTO from "../../dto/IPlanDTO";
import ILocationDTO from "../../dto/ILocationDTO";

export default interface IPlanService  {
  getTruckTime(planDTO: IPlanDTO): Promise<Result<{Z: number, H: number[]}>>;
  getSimulatedTruckTime(planDTO: IPlanDTO): Promise<Result<{Z: number, H: number[]}>>;
  getTruckWarehouses (): Promise<Result<number[]>>;
  getSimulatedTruckWarehouses (): Promise<Result<number[]>>;
}

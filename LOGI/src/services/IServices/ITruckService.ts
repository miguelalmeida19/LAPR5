import { Result } from "../../core/logic/Result";
import ITruckDTO from "../../dto/ITruckDTO";

export default interface ITruckService  {
  createTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
  updateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
  getAll() : Promise<Result<ITruckDTO[]>>;
  getTruck (truckId: string): Promise<Result<ITruckDTO>>;
  deactivateTruck (truckId: string): Promise<Result<ITruckDTO>>;
  activateTruck (truckId: string): Promise<Result<ITruckDTO>>;
}

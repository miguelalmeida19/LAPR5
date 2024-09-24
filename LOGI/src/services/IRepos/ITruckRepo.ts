import { Repo } from "../../core/infra/Repo";
import { Truck } from "../../domain/trucks/truck";
import { TruckId } from "../../domain/trucks/truckId";

export default interface ITruckRepo extends Repo<Truck> {
  save(truck: Truck): Promise<Truck>;
  findByDomainId (truckId: TruckId | string): Promise<Truck>;
  findAll(): Promise<Truck[]>;
  deactivateById(truckId: TruckId | string): Promise<Truck>;
  activateById(truckId: TruckId | string): Promise<Truck>;

}

import {WarehouseId} from "../domain/warehouses/warehouseId";
import {PathDistance} from "../domain/paths/pathDistance";
import {Duration} from "../domain/paths/duration";
import {ConsumedEnergy} from "../domain/paths/consumedEnergy";

export interface IPathPersistence {
  domainId: string;
  departureWarehouse: string;
  arrivalWarehouse: string;
  distance: number;
  duration: number;
  consumedEnergy: number;
}

import { Repo } from "../../core/infra/Repo";
import { Path } from "../../domain/paths/path";
import { PathId } from "../../domain/paths/pathId";
import {WarehouseId} from "../../domain/warehouses/warehouseId";

export default interface IPathRepo extends Repo<Path> {
  save(role: Path): Promise<Path>;
  findByDomainId (pathId: PathId | string): Promise<Path>;
  findById (pathId: PathId | string): Promise<Path[]>;
  findFirstNResults (nResults: number, page: number): Promise<Path[]>;
  findPagesForNResults (nResults: number): Promise<number>;
  findAll(): Promise<Path[]>;
  findByWarehouses(warehouseId1: WarehouseId | string, warehouseId2: WarehouseId | string) : Promise<Path[]>;
  findByDepartureWarehouse(warehouseId: WarehouseId | string) : Promise<Path[]>;
  findByArrivalWarehouse(warehouseId: WarehouseId | string) : Promise<Path[]>;
}

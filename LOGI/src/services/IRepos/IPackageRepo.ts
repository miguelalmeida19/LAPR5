import {Repo} from "../../core/infra/Repo";
import {Package} from "../../domain/packages/package";
import {PackageId} from "../../domain/packages/packageId";
import {ShipmentId} from "../../domain/shipments/shipmentId";
import {DeliveryId} from "../../domain/deliveries/deliveryId";
import {PathId} from "../../domain/paths/pathId";

export default interface IPackageRepo extends Repo<Package> {
  save(role: Package): Promise<Package>;
  findByDomainId(packageId: PackageId | string): Promise<Package[]>;
  findByPackageId(packageId: PackageId | string): Promise<Package>;
  findAll(): Promise<Package[]>;
  findByShipment(shipmentId: ShipmentId | string): Promise<Package[]>;
  findByDelivery(deliveryId: DeliveryId | string): Promise<Package>;
  findByPath(pathId: PathId | string): Promise<Package[]>;
  findFirstNResults (nResults: number, page: number): Promise<Package[]>;
  findPagesForNResults (nResults: number): Promise<number>;
}

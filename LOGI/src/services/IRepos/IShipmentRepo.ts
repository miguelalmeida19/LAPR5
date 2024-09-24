import {Repo} from "../../core/infra/Repo";

import {Shipment} from "../../domain/shipments/shipment";
import {ShipmentId} from "../../domain/shipments/shipmentId";
import {TruckId} from "../../domain/trucks/truckId";

export default interface IShipmentRepo extends Repo<Shipment> {
  save(shipment: Shipment): Promise<Shipment>;
  findByShipmentId(shipmentId: ShipmentId | string): Promise<Shipment>;
  findByDomainId(shipmentId: ShipmentId | string): Promise<Shipment[]>;
  findAll(): Promise<Shipment[]>;
  findByTruck(truckId: TruckId | string) : Promise<Shipment[]>;
  findFirstNResults (nResults: number, page: number): Promise<Shipment[]>;
  findPagesForNResults (nResults: number): Promise<number>;
}

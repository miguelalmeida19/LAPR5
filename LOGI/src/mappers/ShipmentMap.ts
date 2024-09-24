import {Mapper} from "../core/infra/Mapper";
import {Document, Model} from 'mongoose';

import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import {Shipment} from "../domain/shipments/shipment";
import IShipmentDTO from "../dto/IShipmentDTO";
import {IShipmentPersistence} from "../dataschema/IShipmentPersistence";

export class ShipmentMap extends Mapper<Shipment> {

  public static toDTO(shipment: Shipment): IShipmentDTO {
    console.log(shipment);

    return {
      shipmentId: shipment.shipmentId.value,
      truckId: shipment.truckId.value,
      toBeDeliveredDay: shipment.toBeDeliveredDay,
      toBeDeliveredMonth: shipment.toBeDeliveredMonth,
      toBeDeliveredYear: shipment.toBeDeliveredYear
    } as IShipmentDTO;
  }

  public static toDomain(shipment: any | Model<IShipmentPersistence & Document>): Shipment {
    const shipmentOrError = Shipment.create(
      shipment,
      new UniqueEntityID(shipment.domainId)
    );

    shipmentOrError.isFailure ? console.log(shipmentOrError.error) : '';
    return shipmentOrError.isSuccess ? shipmentOrError.getValue() : null;
  }

  public static toPersistence(shipment: Shipment): any {
    return {
      shipmentId: shipment.shipmentId.value,
      truckId: shipment.truckId.value,
      toBeDeliveredDay: shipment.toBeDeliveredDay,
      toBeDeliveredMonth: shipment.toBeDeliveredMonth,
      toBeDeliveredYear: shipment.toBeDeliveredYear
    }
  }

}

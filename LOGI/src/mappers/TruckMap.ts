import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ITruckPersistence } from '../dataschema/ITruckPersistence';

import ITruckDTO from "../dto/ITruckDTO";
import { Truck } from "../domain/trucks/truck";

export class TruckMap extends Mapper<Truck> {

  public static toDTO( truck: Truck): ITruckDTO {
    return {
      truckId: truck.truckId.value,
      tare: truck.tare.value,
      capacity: truck.capacity.value,
      batteryCharge: truck.batteryCharge.value,
      autonomy: truck.autonomy.value,
      rechargeBattery: truck.rechargeBattery.value,
      active: truck.active
    } as ITruckDTO;
  }

  public static toDomain (truck: any | Model<ITruckPersistence & Document> ): Truck {
    const truckOrError = Truck.create(
      truck);

    truckOrError.isFailure ? console.log(truckOrError.error) : '';

    return truckOrError.isSuccess ? truckOrError.getValue() : null;
  }

  public static toPersistence (truck: Truck): any {
    return {
      truckId: truck.truckId.value,
      tare: truck.tare.value,
      capacity: truck.capacity.value,
      batteryCharge: truck.batteryCharge.value,
      autonomy: truck.autonomy.value,
      rechargeBattery: truck.rechargeBattery.value,
      active: truck.active
    }
  }
}

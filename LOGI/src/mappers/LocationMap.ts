import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ILocationPersistence } from '../dataschema/ILocationPersistence';

import ILocationDTO from "../dto/ILocationDTO";
import { Location } from "../domain/locations/location";

export class LocationMap extends Mapper<Location> {

  public static toDTO( location: Location): ILocationDTO {
    return {
      locationId: location.locationId,
      name: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
      altitude: location.altitude,
      warehouseOrientation: location.warehouseOrientation,
      warehouseModelUrl: location.warehouseModelUrl,
      nodeRadius: location.nodeRadius,
    } as ILocationDTO;
  }

  public static toDomain (location: any | Model<ILocationPersistence & Document> ): Location {
    const locationOrError = Location.create(
      location);

    locationOrError.isFailure ? console.log(locationOrError.error) : '';

    return locationOrError.isSuccess ? locationOrError.getValue() : null;
  }

  public static toPersistence (location: Location): any {
    return {
      locationId: location.locationId,
      name: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
      altitude: location.altitude,
      warehouseOrientation: location.warehouseOrientation,
      warehouseModelUrl: location.warehouseModelUrl,
      nodeRadius: location.nodeRadius
    }
  }
}

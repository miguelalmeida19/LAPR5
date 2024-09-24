import {Service, Inject} from 'typedi';

import ILocationRepo from "../services/IRepos/ILocationRepo";
import {Location} from "../domain/locations/location";
import {LocationMap} from "../mappers/LocationMap";

import {Document, FilterQuery, Model} from 'mongoose';
import {ILocationPersistence} from '../dataschema/ILocationPersistence';

@Service()
export default class LocationRepo implements ILocationRepo {
  private models: any;

  constructor(@Inject('locationSchema') private locationSchema: Model<ILocationPersistence & Document>,) {
  }

  public async findAll(): Promise<Location[]> {
    const locations = await this.locationSchema.find();
    return locations.map(location => Location.createExisted(location).getValue());
  }

  private createBaseQuery(): any {
    return {
      where: {},
    }
  }

  public async exists(location: Location): Promise<boolean> {

    const idX = location.locationId;

    const query = {locationId: idX};
    const locationDocument = await this.locationSchema.findOne(query as FilterQuery<ILocationPersistence & Document>);

    return !!locationDocument === true;
  }

  public async save(location: Location): Promise<Location> {
    const query = {locationId: location.locationId};

    const locationDocument = await this.locationSchema.findOne(query);

    try {
      if (locationDocument === null) {
        const rawLocation: any = LocationMap.toPersistence(location);

        const locationCreated = await this.locationSchema.create(rawLocation);

        return LocationMap.toDomain(locationCreated);
      } else {
        locationDocument.name = location.name;
        locationDocument.latitude = location.latitude;
        locationDocument.longitude = location.longitude;
        locationDocument.altitude = location.altitude;
        locationDocument.warehouseOrientation = location.warehouseOrientation;
        locationDocument.warehouseModelUrl = location.warehouseModelUrl;
        locationDocument.nodeRadius = location.nodeRadius;

        await locationDocument.save();

        return location;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(locationId: string): Promise<Location> {
    const query = {locationId: locationId};
    const locationRecord = await this.locationSchema.findOne(query as FilterQuery<ILocationPersistence & Document>);

    if (locationRecord != null) {
      return LocationMap.toDomain(locationRecord);
    } else
      return null;
  }
}

import {Service, Inject} from 'typedi';

import ITruckRepo from "../services/IRepos/ITruckRepo";
import {Truck} from "../domain/trucks/truck";
import {TruckId} from "../domain/trucks/truckId";
import {TruckMap} from "../mappers/TruckMap";

import {Document, FilterQuery, Model} from 'mongoose';
import {ITruckPersistence} from '../dataschema/ITruckPersistence';

@Service()
export default class TruckRepo implements ITruckRepo {
  private models: any;

  constructor(@Inject('truckSchema') private truckSchema: Model<ITruckPersistence & Document>,) {
  }

  public async findAll(): Promise<Truck[]> {
    const trucks = await this.truckSchema.find();
    return trucks.map(truck => Truck.createExisted(truck).getValue());
  }

  private createBaseQuery(): any {
    return {
      where: {},
    }
  }

  public async exists(truck: Truck): Promise<boolean> {

    const idX = truck.truckId instanceof TruckId ? (<TruckId>truck.truckId) : truck.truckId;

    const query = {truckId: idX};
    const truckDocument = await this.truckSchema.findOne(query as FilterQuery<ITruckPersistence & Document>);

    return !!truckDocument === true;
  }

  public async save(truck: Truck): Promise<Truck> {
    const query = {truckId: truck.truckId.value};

    const truckDocument = await this.truckSchema.findOne(query);

    try {
      if (truckDocument === null) {
        const rawTruck: any = TruckMap.toPersistence(truck);

        const truckCreated = await this.truckSchema.create(rawTruck);

        return TruckMap.toDomain(truckCreated);
      } else {
        truckDocument.tare = truck.tare.value;
        truckDocument.capacity = truck.capacity.value;
        truckDocument.batteryCharge = truck.batteryCharge.value;
        truckDocument.autonomy = truck.autonomy.value;
        truckDocument.rechargeBattery = truck.rechargeBattery.value;
        truckDocument.active = truck.active;
        await truckDocument.save();

        return truck;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(truckId: TruckId | string): Promise<Truck> {
    const query = {truckId: truckId};
    const truckRecord = await this.truckSchema.findOne(query as FilterQuery<ITruckPersistence & Document>);

    if (truckRecord != null) {
      return TruckMap.toDomain(truckRecord);
    } else
      return null;
  }
  public async deactivateById(truckId: TruckId | string): Promise<Truck> {
    const query = {truckId: truckId};
    const truckRecord = await this.truckSchema.findOne(query as FilterQuery<ITruckPersistence & Document>);

    if (truckRecord != null) {
      let truck= TruckMap.toDomain(truckRecord);
      truckRecord.active = false
      truck.active = false
      await truckRecord.save();
      return truck;
    } else
      return null;
  }
  public async activateById(truckId: TruckId | string): Promise<Truck> {
    const query = {truckId: truckId};
    const truckRecord = await this.truckSchema.findOne(query as FilterQuery<ITruckPersistence & Document>);

    if (truckRecord != null) {
      let truck= TruckMap.toDomain(truckRecord);
      truckRecord.active = true
      truck.active = true
      await truckRecord.save();
      return truck;
    } else
      return null;

  }
}

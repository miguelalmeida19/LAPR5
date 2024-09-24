import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';

import IShipmentRepo from "../services/IRepos/IShipmentRepo";
import {IShipmentPersistence} from "../dataschema/IShipmentPersistence";

import {Shipment} from "../domain/shipments/shipment";
import {ShipmentId} from "../domain/shipments/shipmentId";
import {TruckId} from "../domain/trucks/truckId";
import {ShipmentMap} from "../mappers/ShipmentMap";
import shipmentSchema from "../persistence/schemas/shipmentSchema";

@Service()
export default class ShipmentRepo implements IShipmentRepo {
  private models: any;

  constructor(
    @Inject('shipmentSchema') private shipmentSchema : Model<IShipmentPersistence & Document>,
  ) {}

  public async findAll(): Promise<Shipment[]> {
    const shipments = await this.shipmentSchema.find();
    return shipments.map(shipment => Shipment.createExisted(shipment).getValue());
  }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(shipment: Shipment): Promise<boolean> {
    const idX = shipment.id instanceof ShipmentId ? (<ShipmentId>shipment.shipmentId) : shipment.shipmentId;

    const query = { shipmentId: idX };
    const shipmentDocument = await this.shipmentSchema.findOne(query as FilterQuery<IShipmentPersistence & Document>);

    return !!shipmentDocument === true;
  }

  public async save(shipment: Shipment): Promise<Shipment> {
    const query = { shipmentId: shipment.shipmentId.value };
    const shipmentDocument = await this.shipmentSchema.findOne(query);

    try {
      if (shipmentDocument === null) {
        const rawShipment : any = ShipmentMap.toPersistence(shipment);
        const shipmentCreated = await this.shipmentSchema.create(rawShipment);

        return ShipmentMap.toDomain(shipmentCreated);
      } else {
        shipmentDocument.truckId = shipment.truckId.value;
        shipmentDocument.toBeDeliveredDay = shipment.toBeDeliveredDay;
        shipmentDocument.toBeDeliveredMonth = shipment.toBeDeliveredMonth;
        shipmentDocument.toBeDeliveredYear = shipment.toBeDeliveredYear;

        await shipmentDocument.save();
        return shipment;
      }
    } catch(err) {
      throw err;
    }
  }

  public async findPagesForNResults (nResults: number): Promise<number> {
    const number = await shipmentSchema
      .estimatedDocumentCount();

    return Math.ceil(number/nResults);
  }

  public async findFirstNResults (nResults: number, page: number): Promise<Shipment[]> {
    const query = await shipmentSchema
      .find()
      .sort({_id: 1})
      .skip( page > 0 ? ( ( page - 1 ) * nResults ) : 0 )
      .limit( nResults );

    if( query != null) {
      return query.map(s => Shipment.createExisted(s).getValue());
    }
    else
      return null;
  }

  public async findByShipmentId(shipmentId: ShipmentId | string): Promise<Shipment> {
    const query = { shipmentId: shipmentId };
    const shipmentRecord = await this.shipmentSchema.findOne(query as FilterQuery<IShipmentPersistence & Document>);

    if (shipmentRecord != null) {
      return ShipmentMap.toDomain(shipmentRecord);
    }
    else return null;
  }

  public async findByDomainId(shipmentId: ShipmentId | string): Promise<Shipment[]> {
    const query = {"shipmentId" : {$regex: shipmentId, $options: 'i'}};
    const shipments = await this.shipmentSchema.find(query as FilterQuery<IShipmentPersistence & Document>);

    if (shipments != null) {
      return shipments.map(shipment => Shipment.createExisted(shipment).getValue());
    }
    else return null;
  }

  public async findByTruck(truckId: TruckId | string): Promise<Shipment[]> {
    const query = { "truckId" : { $regex: truckId.toString(), $options: 'i' }};
    const shipments = await this.shipmentSchema.find(query as FilterQuery<IShipmentPersistence & Document>);

    if (shipments != null) {
      return shipments.map(shipment => Shipment.createExisted(shipment).getValue());
    } else return null;
  }

}

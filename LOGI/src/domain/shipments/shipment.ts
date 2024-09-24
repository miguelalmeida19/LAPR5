import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";

import {Document, Model} from "mongoose";
import {Result} from "../../core/logic/Result";

import {TruckId} from "../trucks/truckId";
import {ShipmentId} from "./shipmentId";
import IShipmentDTO from "../../dto/IShipmentDTO";
import {IShipmentPersistence} from "../../dataschema/IShipmentPersistence";

interface ShipmentProps {
  shipmentId: ShipmentId;
  truckId: TruckId;
  toBeDeliveredDay: number;
  toBeDeliveredMonth: number;
  toBeDeliveredYear: number;
}

export class Shipment extends AggregateRoot<ShipmentProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get shipmentId(): ShipmentId {
    return this.props.shipmentId;
  }

  get truckId(): TruckId {
    return this.props.truckId;
  }

  get toBeDeliveredDay(): number {
    return this.props.toBeDeliveredDay;
  }

  get toBeDeliveredMonth(): number {
    return this.props.toBeDeliveredMonth;
  }

  get toBeDeliveredYear(): number {
    return this.props.toBeDeliveredYear;
  }

  set shipmentId(value: ShipmentId) {
    this.props.shipmentId = value;
  }

  set truckId(value: TruckId) {
    this.props.truckId = value;
  }

  set toBeDeliveredDay(value: number) {
    this.props.toBeDeliveredDay = value;
  }

  set toBeDeliveredMonth(value: number) {
    this.props.toBeDeliveredMonth = value;
  }

  set toBeDeliveredYear(value: number) {
    this.props.toBeDeliveredYear = value;
  }

  public static validate(toBeDeliveredDay: number, toBeDeliveredMonth: number, toBeDeliveredYear: number) {
    if (toBeDeliveredDay >= 1 && toBeDeliveredDay <= 31
      && toBeDeliveredMonth >= 1 && toBeDeliveredMonth <= 12
      && toBeDeliveredYear >= 2022 && toBeDeliveredYear <= 2025) {
    } else {
      throw new Error("Business Error - Must provide a valid Target Date");
    }
  }

  private constructor(props: ShipmentProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(shipmentDTO: IShipmentDTO, id?: UniqueEntityID): Result<Shipment> {
    const _shipmentId = ShipmentId.create(shipmentDTO.shipmentId);
    if (_shipmentId.isFailure) return Result.fail<Shipment>('Business Error - Must provide a valid Shipment ID');

    const _truckId = TruckId.create(shipmentDTO.truckId);
    if (_truckId.isFailure) return Result.fail<Shipment>("Business Error - Must provide a valid Truck ID");

    const _toBeDeliveredDay = shipmentDTO.toBeDeliveredDay;
    const _toBeDeliveredMonth = shipmentDTO.toBeDeliveredMonth;
    const _toBeDeliveredYear = shipmentDTO.toBeDeliveredYear;
    try {
      this.validate(_toBeDeliveredDay, _toBeDeliveredMonth, _toBeDeliveredYear);

      const shipment = new Shipment({
        shipmentId: _shipmentId.getValue(),
        truckId: _truckId.getValue(),
        toBeDeliveredDay: _toBeDeliveredDay,
        toBeDeliveredMonth: _toBeDeliveredMonth,
        toBeDeliveredYear: _toBeDeliveredYear,
      }, id);

      return Result.ok<Shipment>(shipment);
    } catch (e) {
      return Result.fail<Shipment>(e.toString());
    }
  }

  public static createExisted(shipment: any | Model<IShipmentPersistence & Document>): Result<Shipment> {
    const _shipmentId = ShipmentId.create(shipment.shipmentId);
    if (_shipmentId.isFailure) return Result.fail<Shipment>('Business Error - Must provide a valid Shipment ID');

    const _truckId = TruckId.create(shipment.truckId);
    if (_truckId.isFailure) return Result.fail<Shipment>("Business Error - Must provide a valid Truck ID");

    const _toBeDeliveredDay = shipment.toBeDeliveredDay;
    const _toBeDeliveredMonth = shipment.toBeDeliveredMonth;
    const _toBeDeliveredYear = shipment.toBeDeliveredYear;
    this.validate(_toBeDeliveredDay, _toBeDeliveredMonth, _toBeDeliveredYear);

    shipment = new Shipment({
      shipmentId: _shipmentId.getValue(),
      truckId: _truckId.getValue(),
      toBeDeliveredDay: _toBeDeliveredDay,
      toBeDeliveredMonth: _toBeDeliveredMonth,
      toBeDeliveredYear: _toBeDeliveredYear,
    }, shipment.domainId);

    return Result.ok<Shipment>(shipment);
  }

}

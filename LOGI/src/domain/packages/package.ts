import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";

import {Document, Model} from "mongoose";
import {Result} from "../../core/logic/Result";
import {ShipmentId} from "../shipments/shipmentId";
import {DeliveryId} from "../deliveries/deliveryId";
import {PathId} from "../paths/pathId";
import {PackageId} from "./packageId";
import IPackageDTO from "../../dto/IPackageDTO";
import {IPackagePersistence} from "../../dataschema/IPackagePersistence";

interface PackageProps {
  packageId: PackageId;
  xCoordinate: number;
  yCoordinate: number;
  zCoordinate: number;
  shipmentId: ShipmentId;
  deliveryId: DeliveryId;
  pathId: PathId;
}

export class Package extends AggregateRoot<PackageProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get packageId(): PackageId {
    return this.props.packageId;
  }

  get shipmentId(): ShipmentId {
    return this.props.shipmentId;
  }

  get deliveryId(): DeliveryId {
    return this.props.deliveryId;
  }

  get pathId(): PathId {
    return this.props.pathId;
  }

  get xCoordinate(): number {
    return this.props.xCoordinate;
  }

  get yCoordinate(): number {
    return this.props.yCoordinate;
  }

  get zCoordinate(): number {
    return this.props.zCoordinate;
  }

  set packageId(value: PackageId) {
    this.props.packageId = value;
  }

  set xCoordinate(value: number) {
    this.props.xCoordinate = value;
  }

  set yCoordinate(value: number) {
    this.props.yCoordinate = value;
  }

  set zCoordinate(value: number) {
    this.props.zCoordinate = value;
  }

  set shipmentId(value: ShipmentId) {
    this.props.shipmentId = value;
  }

  set deliveryId(value: DeliveryId) {
    this.props.deliveryId = value;
  }

  set pathId(value: PathId) {
    this.props.pathId = value;
  }

  public static validate(xCoordinate: number, yCoordinate: number, zCoordinate: number) {
    if (xCoordinate < 1 || xCoordinate > 1000) {
      throw new Error("Business Error - Must provide a valid x Coordinate");
    }
    else if (yCoordinate < 1 || yCoordinate > 1000) {
      throw new Error("Business Error - Must provide a valid y Coordinate");
    }
    else if (zCoordinate < 1 || zCoordinate > 1000) {
      throw new Error("Business Error - Must provide a valid z Coordinate");
    }
  }

  private constructor(props: PackageProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(packageDTO: IPackageDTO, id?: UniqueEntityID): Result<Package> {
    const _packageId = PackageId.create(packageDTO.packageId);
    if (_packageId.isFailure) return Result.fail<Package>("Business Error - Must provide a valid Package ID");

    const _shipmentId = ShipmentId.create(packageDTO.shipmentId);
    if (_shipmentId.isFailure) return Result.fail<Package>("Business Error - Must provide a valid Shipment ID");

    const _deliveryId = DeliveryId.create(packageDTO.deliveryId);
    if (_deliveryId.isFailure) return Result.fail<Package>("Business Error - Must provide a valid Delivery ID");

    const _pathId = new PathId(packageDTO.pathId);
    if (_pathId === null || _pathId.toString().length === 0) return Result.fail<Package>("Business Error - Must provide a valid Path ID");

    const _xCoordinate = packageDTO.xCoordinate;
    const _yCoordinate = packageDTO.yCoordinate;
    const _zCoordinate = packageDTO.zCoordinate;
    if (_xCoordinate < 1 || _xCoordinate > 1000 || _xCoordinate === undefined)
      return Result.fail<Package>("Business Error - Must provide a valid x Coordinate");
    else if (_yCoordinate < 1 || _yCoordinate > 1000 || _yCoordinate === undefined)
      return Result.fail<Package>("Business Error - Must provide a valid y Coordinate");
    else if (_zCoordinate < 1 || _zCoordinate > 1000 || _zCoordinate === undefined)
      return Result.fail<Package>("Business Error - Must provide a valid z Coordinate");

    const _package = new Package({
      packageId: _packageId.getValue(),
      xCoordinate: _xCoordinate,
      yCoordinate: _yCoordinate,
      zCoordinate: _zCoordinate,
      shipmentId: _shipmentId.getValue(),
      deliveryId: _deliveryId.getValue(),
      pathId: _pathId
    }, id);

    return Result.ok<Package>(_package);
  }

  public static createExisted(_package: any | Model<IPackagePersistence & Document>): Result<Package> {
    const _packageId = PackageId.create(_package.packageId);
    if (_packageId.isFailure)  return Result.fail<Package>("Business Error - Must provide a valid Package ID");

    const _shipmentId = ShipmentId.create(_package.shipmentId);
    if (_shipmentId.isFailure) return Result.fail<Package>('Business Error - Must provide a valid Shipment ID');

    const _deliveryId = DeliveryId.create(_package.deliveryId);
    if (_deliveryId.isFailure) return Result.fail<Package>('Business Error - Must provide a valid Delivery ID');

    const _pathId = new UniqueEntityID(_package.pathId);
    if (_pathId === null || _pathId.toString().length === 0) return Result.fail<Package>("Business Error - Must provide a valid Path ID");

    const _xCoordinate = _package.xCoordinate;
    const _yCoordinate = _package.yCoordinate;
    const _zCoordinate = _package.zCoordinate;
    this.validate(_xCoordinate, _yCoordinate, _zCoordinate);

    _package = new Package({
      packageId: _packageId.getValue(),
      xCoordinate: _xCoordinate,
      yCoordinate: _yCoordinate,
      zCoordinate: _zCoordinate,
      shipmentId: _shipmentId.getValue(),
      deliveryId: _deliveryId.getValue(),
      pathId: _pathId
    }, _package.domainId);

    return Result.ok<Package>(_package);
  }

}

import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {Result} from "../../core/logic/Result";
import {Document, Model} from "mongoose";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";
import ILocationDTO from "../../dto/ILocationDTO";
import {ILocationPersistence} from "../../dataschema/ILocationPersistence";

interface LocationProps {
  locationId: string,
  name: string,
  latitude: number,
  longitude: number,
  altitude: number,
  warehouseOrientation: number,
  warehouseModelUrl: string,
  nodeRadius: number,
}

export class Location extends AggregateRoot<LocationProps> {

  get id(): UniqueEntityID {
    return this._id;
  }

  get locationId(): string {
    return this.props.locationId;
  }

  get name(): string {
    return this.props.name;
  }

  get latitude(): number {
    return this.props.latitude;
  }

  get longitude(): number {
    return this.props.longitude;
  }

  get altitude(): number {
    return this.props.altitude;
  }

  get warehouseOrientation(): number {
    return this.props.warehouseOrientation;
  }

  get warehouseModelUrl(): string {
    return this.props.warehouseModelUrl;
  }

  get nodeRadius(): number {
    return this.props.nodeRadius;
  }

  set nodeRadius(value: number) {
    this.props.nodeRadius = value;
  }

  set locationId(value: string) {
    this.props.locationId = value;
  }

  set name(value: string) {
    this.props.name = value;
  }

  set latitude(value: number) {
    this.props.latitude = value;
  }

  set longitude(value: number) {
    this.props.longitude = value;
  }

  set altitude(value: number) {
    this.props.altitude = value;
  }

  set warehouseOrientation(value: number) {
    this.props.warehouseOrientation = value;
  }

  set warehouseModelUrl(value: string) {
    this.props.warehouseModelUrl = value;
  }

  public static validate(
    locationId: string, name: string, latitude: number, longitude: number,
    altitude: number, warehouseOrientation: number, warehouseUrl: string, nodeRadius: number): void {

    if (!name.trim()) {
      throw new Error("Name cannot be empty");
    }
  }

  public static create(locationDTO: ILocationDTO): Result<Location> {
    const locationId = locationDTO.locationId
    const name = locationDTO.name;
    const latitude = locationDTO.latitude;
    const longitude = locationDTO.longitude;
    const altitude = locationDTO.altitude;
    const warehouseOrientation = locationDTO.warehouseOrientation;
    const warehouseModelUrl = locationDTO.warehouseModelUrl;
    const nodeRadius = locationDTO.nodeRadius;


    this.validate(locationId, name, latitude, longitude, altitude, warehouseOrientation, warehouseModelUrl, nodeRadius);
    const location = new Location({
      locationId: locationId,
      name: name,
      latitude: latitude,
      longitude: longitude,
      altitude: altitude,
      warehouseOrientation: warehouseOrientation,
      warehouseModelUrl: warehouseModelUrl,
      nodeRadius: nodeRadius
    });
    return Result.ok<Location>(location)
  }

  public static createExisted(location: any | Model<ILocationPersistence & Document>): Result<Location> {
    this.validate(location.id, location.name, location.latitude,
      location.longitude, location.altitude, location.warehouseOrientation,
      location.warehouseModelUrl, location.nodeRadius);

    location = new Location({
      locationId: location.locationId,
      name: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
      altitude: location.altitude,
      warehouseOrientation: location.warehouseOrientation,
      warehouseModelUrl: location.warehouseModelUrl,
      nodeRadius: location.nodeRadius,
    });
    return Result.ok<Location>(location)
  }

}

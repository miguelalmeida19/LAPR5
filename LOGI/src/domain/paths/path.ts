import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";

import {Result} from "../../core/logic/Result";
import {PathId} from "./pathId";

import IPathDTO from "../../dto/IPathDTO";
import {Document, Model} from "mongoose";
import {IPathPersistence} from "../../dataschema/IPathPersistence";
import {WarehouseId} from "../warehouses/warehouseId";
import {PathDistance} from "./pathDistance";
import {Duration} from "./duration";
import {ConsumedEnergy} from "./consumedEnergy";

interface PathProps {
  departureWarehouse: WarehouseId;
  arrivalWarehouse: WarehouseId;
  distance: PathDistance;
  duration: Duration;
  consumedEnergy: ConsumedEnergy;
}

export class Path extends AggregateRoot<PathProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get pathId(): PathId {
    return new PathId(this.pathId.toValue());
  }

  get departureWarehouse(): WarehouseId {
    return this.props.departureWarehouse;
  }

  get arrivalWarehouse(): WarehouseId {
    return this.props.arrivalWarehouse;
  }

  get distance(): PathDistance {
    return this.props.distance;
  }

  get duration(): Duration {
    return this.props.duration;
  }

  get consumedEnergy(): ConsumedEnergy {
    return this.props.consumedEnergy;
  }

  set departureWarehouse(value: WarehouseId) {
    this.props.departureWarehouse = value;
  }

  set arrivalWarehouse(value: WarehouseId) {
    this.props.arrivalWarehouse = value;
  }

  set distance(value: PathDistance) {
    this.props.distance = value;
  }

  set duration(value: Duration) {
    this.props.duration = value;
  }

  set consumedEnergy(value: ConsumedEnergy) {
    this.props.consumedEnergy = value;
  }

  private constructor(props: PathProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static validate(distance: PathDistance, duration: Duration, consumedEnergy: ConsumedEnergy){
    if (distance.value<0){
      throw new Error("Must provide a valid distance");
    }
    else if (duration.value<0){
      throw new Error("Must provide a valid duration");
    }
    else if (consumedEnergy.value<0){
      throw new Error("Must provide a valid consumed energy");
    }
  }

  public static create(pathDTO: IPathDTO, id?: UniqueEntityID): Result<Path> {
    const departureWarehouse = WarehouseId.create(pathDTO.departureWarehouse);
    if (departureWarehouse.isFailure){
      return Result.fail<Path>('Must provide a valid departure warehouse')
    }
    const arrivalWarehouse = WarehouseId.create(pathDTO.arrivalWarehouse);
    if (arrivalWarehouse.isFailure){
      return Result.fail<Path>('Must provide a valid arrival warehouse')
    }
    const distance = PathDistance.create(pathDTO.distance);
    if (distance.isFailure){
      return Result.fail<Path>('Must provide a valid distance')
    }
    const duration = Duration.create(pathDTO.duration);
    if (duration.isFailure){
      return Result.fail<Path>('Must provide a valid duration')
    }
    const consumedEnergy = ConsumedEnergy.create(pathDTO.consumedEnergy);
    if (consumedEnergy.isFailure){
      return Result.fail<Path>('Must provide a valid consumed energy')
    }

    if (departureWarehouse===arrivalWarehouse){
      throw new Error("Arrival and Departure Warehouses cannot be the same")
    }

    this.validate(distance.getValue(),duration.getValue(),consumedEnergy.getValue());

    const path = new Path({
      departureWarehouse: departureWarehouse.getValue(),
      arrivalWarehouse: arrivalWarehouse.getValue(),
      distance: distance.getValue(),
      duration: duration.getValue(),
      consumedEnergy: consumedEnergy.getValue()
    }, id);
    return Result.ok<Path>(path)
  }

  public static createExisted(path: any | Model<IPathPersistence & Document>): Result<Path> {

    const departureWarehouse = WarehouseId.create(path.departureWarehouse);
    if (departureWarehouse.isFailure){
      return Result.fail<Path>('Must provide a valid departure warehouse')
    }
    const arrivalWarehouse = WarehouseId.create(path.arrivalWarehouse);
    if (arrivalWarehouse.isFailure){
      return Result.fail<Path>('Must provide a valid arrival warehouse')
    }
    const distance = PathDistance.create(path.distance);
    if (distance.isFailure){
      return Result.fail<Path>('Must provide a valid distance')
    }
    const duration = Duration.create(path.duration);
    if (duration.isFailure){
      return Result.fail<Path>('Must provide a valid duration')
    }
    const consumedEnergy = ConsumedEnergy.create(path.consumedEnergy);
    if (consumedEnergy.isFailure){
      return Result.fail<Path>('Must provide a valid consumed energy')
    }

    if (departureWarehouse===arrivalWarehouse){
      throw new Error("Arrival and Departure Warehouses cannot be the same")
    }

    this.validate(distance.getValue(),duration.getValue(),consumedEnergy.getValue());

    path = new Path({
      departureWarehouse: departureWarehouse.getValue(),
      arrivalWarehouse: arrivalWarehouse.getValue(),
      distance: distance.getValue(),
      duration: duration.getValue(),
      consumedEnergy: consumedEnergy.getValue()
    }, path.domainId);
    return Result.ok<Path>(path)
  }
}

import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IPathPersistence } from '../dataschema/IPathPersistence';

import IPathDTO from "../dto/IPathDTO";
import { Path } from "../domain/paths/path";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class PathMap extends Mapper<Path> {

  public static toDTO( path: Path): IPathDTO {
    console.log(path)
    return {
      id: path.id.toString(),
      departureWarehouse: path.departureWarehouse.value,
      arrivalWarehouse: path.arrivalWarehouse.value,
      distance: path.distance.value,
      duration: path.duration.value,
      consumedEnergy: path.consumedEnergy.value,
    } as IPathDTO;
  }

  public static toDomain (path: any | Model<IPathPersistence & Document> ): Path {
    const pathOrError = Path.create(
      path,
      new UniqueEntityID(path.domainId)
    );

    pathOrError.isFailure ? console.log(pathOrError.error) : '';

    return pathOrError.isSuccess ? pathOrError.getValue() : null;
  }

  public static toPersistence (path: Path): any {
    return {
      domainId: path.id.toString(),
      departureWarehouse: path.departureWarehouse.value,
      arrivalWarehouse: path.arrivalWarehouse.value,
      distance: path.distance.value,
      duration: path.duration.value,
      consumedEnergy: path.consumedEnergy.value
    }
  }
}

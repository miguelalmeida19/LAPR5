import { Document, Model } from 'mongoose';

import { Mapper } from "../core/infra/Mapper";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import {Package} from "../domain/packages/package";
import IPackageDTO from "../dto/IPackageDTO";
import {IPackagePersistence} from "../dataschema/IPackagePersistence";

export class PackageMap extends Mapper<Package> {

  public static toDTO(_package: Package): IPackageDTO {
    console.log(_package);
    return {
      packageId: _package.packageId.value,
      xCoordinate: _package.xCoordinate,
      yCoordinate: _package.yCoordinate,
      zCoordinate: _package.zCoordinate,
      shipmentId: _package.shipmentId.value,
      deliveryId: _package.deliveryId.value,
      pathId: _package.pathId.toValue()
    } as IPackageDTO;
  }

  public static toDomain(_package: any | Model<IPackagePersistence & Document>): Package {
    const packageOrError = Package.create(
      _package,
      new UniqueEntityID(_package.domainId)
    );

    packageOrError.isFailure ? console.log(packageOrError.error) : '';
    return packageOrError.isSuccess ? packageOrError.getValue() : null;
  }

  public static toPersistence(_package: Package): any {
    return {
      packageId: _package.packageId.value,
      xCoordinate: _package.xCoordinate,
      yCoordinate: _package.yCoordinate,
      zCoordinate: _package.zCoordinate,
      shipmentId: _package.shipmentId.value,
      deliveryId: _package.deliveryId.value,
      pathId: _package.pathId.toValue()
    }
  }
}

import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';

import IPackageRepo from "../services/IRepos/IPackageRepo";
import {IPackagePersistence} from "../dataschema/IPackagePersistence";
import {PackageMap} from "../mappers/PackageMap";

import {Package} from "../domain/packages/package";
import {PackageId} from "../domain/packages/packageId";
import {ShipmentId} from "../domain/shipments/shipmentId";
import {DeliveryId} from "../domain/deliveries/deliveryId";
import {PathId} from "../domain/paths/pathId";
import packageSchema from "../persistence/schemas/packageSchema";

@Service()
export default class PackageRepo implements IPackageRepo {
  private models: any;

  constructor(
    @Inject('packageSchema') private packageSchema : Model<IPackagePersistence & Document>,
  ) {}

  public async findAll(): Promise<Package[]> {
    const _packages = await this.packageSchema.find();
    return _packages.map(_package => Package.createExisted(_package).getValue());
  }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(t: Package): Promise<boolean> {
    const _id = t.id instanceof PackageId ? (<PackageId>t.packageId) : t.packageId;

    const query = { packageId: _id };
    const packageDocument = await this.packageSchema.findOne(query as FilterQuery<IPackagePersistence & Document>);

    return !!packageDocument === true;
  }

  public async save(t: Package): Promise<Package> {
    const query = { packageId: t.packageId.value };
    const packageDocument = await this.packageSchema.findOne(query);

    try {
      if (packageDocument === null) {
        const rawPackage: any = PackageMap.toPersistence(t);
        const packageCreated = await this.packageSchema.create(rawPackage);

        return PackageMap.toDomain(packageCreated);
      } else {
        packageDocument.xCoordinate = t.xCoordinate;
        packageDocument.yCoordinate = t.yCoordinate;
        packageDocument.zCoordinate = t.zCoordinate;
        packageDocument.shipmentId = t.shipmentId.value;
        packageDocument.deliveryId = t.deliveryId.value;
        packageDocument.pathId = t.pathId.toValue().toString();

        await packageDocument.save();
        return t;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findPagesForNResults (nResults: number): Promise<number> {
    const number = await packageSchema
      .estimatedDocumentCount();

    return Math.ceil(number/nResults);
  }

  public async findFirstNResults (nResults: number, page: number): Promise<Package[]> {
    const query = await packageSchema
      .find()
      .sort({_id: 1})
      .skip( page > 0 ? ( ( page - 1 ) * nResults ) : 0 )
      .limit( nResults );

    if (query != null) return query.map(p => Package.createExisted(p).getValue());
    else return null;
  }

  public async findByPackageId(packageId: PackageId | string): Promise<Package> {
    const query = { packageId: packageId };
    const packageRecord = await this.packageSchema.findOne(query as FilterQuery<IPackagePersistence & Document>);

    if (packageRecord != null) return PackageMap.toDomain(packageRecord);
    else return null;
  }

  public async findByDomainId(packageId: PackageId | string): Promise<Package[]> {
    const query = { "packageId" : {$regex: packageId, $options: 'i' } };
    const _packages = await this.packageSchema.find(query as FilterQuery<IPackagePersistence & Document>);

    if (_packages != null) return _packages.map(p => Package.createExisted(p).getValue());
    else return null;
  }

  public async findByShipment(shipmentId: ShipmentId | string): Promise<Package[]> {
    const query = { "shipmentId": { $regex: shipmentId.toString(), $options: 'i' }};
    const l = await this.packageSchema.find(query as FilterQuery<IPackagePersistence & Document>);

    if (l != null) return l.map(x => Package.createExisted(x).getValue());
    else return null;
  }

  public async findByDelivery(deliveryId: DeliveryId | string): Promise<Package> {
    const query = { "deliveryId": { $regex: deliveryId.toString(), $options: 'i' }};
    const packageRecord = await this.packageSchema.find(query as FilterQuery<IPackagePersistence & Document>);

    if (packageRecord != null) return PackageMap.toDomain(packageRecord);
    else return null;
  }

  public async findByPath(pathId: PathId | string): Promise<Package[]> {
    const query = { "pathId": { $regex: pathId.toString(), $options: 'i' }};
    const l = await this.packageSchema.find(query as FilterQuery<IPackagePersistence & Document>);

    if (l != null) return l.map(x => Package.createExisted(x).getValue());
    else return null;
  }

}

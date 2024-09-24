import { Service, Inject } from 'typedi';

import IPathRepo from "../services/IRepos/IPathRepo";
import { Path } from "../domain/paths/path";
import { PathId } from "../domain/paths/pathId";
import { PathMap } from "../mappers/PathMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IPathPersistence } from '../dataschema/IPathPersistence';
import {WarehouseId} from "../domain/warehouses/warehouseId";
import pathSchema from "../persistence/schemas/pathSchema";

@Service()
export default class PathRepo implements IPathRepo {
  private models: any;

  constructor(
    @Inject('pathSchema') private pathSchema : Model<IPathPersistence & Document>,
  ) {}

  public async findAll(): Promise<Path[]> {
    const paths = await this.pathSchema.find();
    return paths.map(path => Path.createExisted(path).getValue());
  }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(path: Path): Promise<boolean> {

    const idX = path.id instanceof PathId ? (<PathId>path.id).toValue() : path.id;

    const query = { domainId: idX};
    const pathDocument = await this.pathSchema.findOne( query as FilterQuery<IPathPersistence & Document>);

    return !!pathDocument === true;
  }

  public async save (path: Path): Promise<Path> {
    const query = { domainId: path.id.toString()};

    const pathDocument = await this.pathSchema.findOne( query );

    try {
      if (pathDocument === null ) {
        const rawPath: any = PathMap.toPersistence(path);

        const pathCreated = await this.pathSchema.create(rawPath);

        return PathMap.toDomain(pathCreated);
      } else {
        pathDocument.departureWarehouse = path.departureWarehouse.value;
        pathDocument.arrivalWarehouse = path.arrivalWarehouse.value;
        pathDocument.distance = path.distance.value;
        pathDocument.duration = path.duration.value;
        pathDocument.consumedEnergy = path.consumedEnergy.value;
        await pathDocument.save();

        return path;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (pathId: PathId | string): Promise<Path> {
    const query = { domainId: pathId};
    const pathRecord = await this.pathSchema.findOne( query as FilterQuery<IPathPersistence & Document> );

    if( pathRecord != null) {
      return PathMap.toDomain(pathRecord);
    }
    else
      return null;
  }

  public async findById (pathId: PathId | string): Promise<Path[]> {
    const query = { "domainId" : { $regex: pathId, $options: 'i' } };
    const paths = await this.pathSchema.find( query as FilterQuery<IPathPersistence & Document> );

    if( paths != null) {
      return paths.map(path => Path.createExisted(path).getValue());
    }
    else
      return null;
  }

  public async findPagesForNResults (nResults: number): Promise<number> {
    const number = await pathSchema
      .estimatedDocumentCount();

    return Math.ceil(number/nResults);
  }

  public async findFirstNResults (nResults: number, page: number): Promise<Path[]> {

    const paths = await pathSchema
      .find()
      .sort({_id: 1})
      .skip( page > 0 ? ( ( page - 1 ) * nResults ) : 0 )
      .limit( nResults );

    if( paths != null) {
      return paths.map(path => Path.createExisted(path).getValue());
    }
    else
      return null;
  }


  public async findByWarehouses(warehouseId1: WarehouseId | string, warehouseId2: WarehouseId | string) : Promise<Path[]>{
    let wId1;
    let wId2;

    if (warehouseId1 instanceof WarehouseId && warehouseId2 instanceof WarehouseId){
      wId1 = warehouseId1.value
      wId2 = warehouseId2.value
    }else {
      wId1 = warehouseId1
      wId2 = warehouseId2
    }

    const query = { departureWarehouse: wId1, arrivalWarehouse: wId2};
    const paths = await this.pathSchema.find( query as FilterQuery<IPathPersistence & Document> );

    if( paths != null && paths.length>0 ) {
      return paths.map(path => Path.createExisted(path).getValue());
    }
    else
      return null;
  }

  public async findByDepartureWarehouse(warehouseId: WarehouseId | string) : Promise<Path[]>{
    const query = { "departureWarehouse" : { $regex: warehouseId.toString(), $options: 'i' } };
    const paths = await this.pathSchema.find( query as FilterQuery<IPathPersistence & Document> );

    if( paths != null) {
      return paths.map(path => Path.createExisted(path).getValue());
    }
    else
      return null;
  }

  public async findByArrivalWarehouse(warehouseId: string | WarehouseId): Promise<Path[]> {
    const query = { "arrivalWarehouse" : { $regex: warehouseId.toString(), $options: 'i' } };
    const paths = await this.pathSchema.find( query as FilterQuery<IPathPersistence & Document> );

    if( paths != null) {
      return paths.map(path => Path.createExisted(path).getValue());
    }
    else
      return null;
  }
}

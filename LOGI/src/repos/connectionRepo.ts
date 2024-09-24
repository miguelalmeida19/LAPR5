import {Service, Inject} from 'typedi';

import IConnectionRepo from "../services/IRepos/IConnectionRepo";
import {Connection} from "../domain/connections/connection";
import {ConnectionMap} from "../mappers/ConnectionMap";

import {Document, FilterQuery, Model} from 'mongoose';
import {IConnectionPersistence} from '../dataschema/IConnectionPersistence';

@Service()
export default class ConnectionRepo implements IConnectionRepo {
  private models: any;

  constructor(@Inject('connectionSchema') private connectionSchema: Model<IConnectionPersistence & Document>,) {
  }

  public async findAll(): Promise<Connection[]> {
    const connections = await this.connectionSchema.find();
    return connections.map(connection => Connection.createExisted(connection).getValue());
  }

  private createBaseQuery(): any {
    return {
      where: {},
    }
  }

  public async exists(connection: Connection): Promise<boolean> {

    const idX = connection.connectionId;

    const query = {connectionId: idX};
    const connectionDocument = await this.connectionSchema.findOne(query as FilterQuery<IConnectionPersistence & Document>);

    return !!connectionDocument === true;
  }

  public async save(connection: Connection): Promise<Connection> {
    const query = {connectionId: connection.connectionId};

    const connectionDocument = await this.connectionSchema.findOne(query);

    try {
      if (connectionDocument === null) {
        const rawConnection: any = ConnectionMap.toPersistence(connection);

        const connectionCreated = await this.connectionSchema.create(rawConnection);

        return ConnectionMap.toDomain(connectionCreated);
      } else {
        connectionDocument.cityX = connection.cityX;
        connectionDocument.cityY = connection.cityY;
        connectionDocument.width = connection.width;

        await connectionDocument.save();

        return connection;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(connectionId: string): Promise<Connection> {
    const query = {connectionId: connectionId};
    const connectionRecord = await this.connectionSchema.findOne(query as FilterQuery<IConnectionPersistence & Document>);

    if (connectionRecord != null) {
      return ConnectionMap.toDomain(connectionRecord);
    } else
      return null;
  }
}

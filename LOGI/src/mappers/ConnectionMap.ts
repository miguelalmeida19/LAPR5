import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IConnectionPersistence } from '../dataschema/IConnectionPersistence';

import IConnectionDTO from "../dto/IConnectionDTO";
import { Connection } from "../domain/connections/connection";

export class ConnectionMap extends Mapper<Connection> {

  public static toDTO( connection: Connection): IConnectionDTO {
    return {
      connectionId: connection.connectionId,
      cityX: connection.cityX,
      cityY: connection.cityY,
      width: connection.width
    } as IConnectionDTO;
  }

  public static toDomain (connection: any | Model<IConnectionPersistence & Document> ): Connection {
    const connectionOrError = Connection.create(
      connection);

    connectionOrError.isFailure ? console.log(connectionOrError.error) : '';

    return connectionOrError.isSuccess ? connectionOrError.getValue() : null;
  }

  public static toPersistence (connection: Connection): any {
    return {
      connectionId: connection.connectionId,
      cityX: connection.cityX,
      cityY: connection.cityY,
      width: connection.width
    }
  }
}

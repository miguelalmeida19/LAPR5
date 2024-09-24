import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {Result} from "../../core/logic/Result";
import IConnectionDTO from "../../dto/IConnectionDTO";
import {Document, Model} from "mongoose";
import {IConnectionPersistence} from "../../dataschema/IConnectionPersistence";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";

interface ConnectionProps {
  connectionId: string
  cityX: number;
  cityY: number;
  width: number;
}

export class Connection extends AggregateRoot<ConnectionProps> {

  get id(): UniqueEntityID {
    return this._id;
  }

  get connectionId(): string {
    return this.props.connectionId;
  }

  get cityX(): number {
    return this.props.cityX;
  }

  get cityY(): number {
    return this.props.cityY;
  }

  get width(): number {
    return this.props.width;
  }

  set connectionId(value: string) {
    this.props.connectionId = value;
  }

  set cityX(value: number) {
    this.props.cityX = value;
  }

  set cityY(value: number) {
    this.props.cityY = value;
  }

  set width(value: number) {
    this.props.cityY = value;
  }

  public static validate(id: string, cityX: number, cityY: number, width: number): void {

    if (cityX < 0) {
      throw new Error("City X cannot be negative")
    } else if (cityY < 0) {
      throw new Error("City Y cannot be negative")
    } else if (width < 1 || width > 8) {
      throw new Error("Road Width must be in the range of 1-8")
    }
  }

  public static create(connectionDTO: IConnectionDTO): Result<Connection> {
    const connectionId = connectionDTO.connectionId
    const cityX = connectionDTO.cityX
    const cityY = connectionDTO.cityY
    const width = connectionDTO.width


    this.validate(connectionId, cityX, cityY, width);
    const connection = new Connection({
      connectionId: connectionId,
      cityX: cityX,
      cityY: cityY,
      width: width
    });
    return Result.ok<Connection>(connection)
  }

  public static createExisted(connection: any | Model<IConnectionPersistence & Document>): Result<Connection> {
    this.validate(connection.id, connection.cityX, connection.cityY, connection.width);

    connection = new Connection({
      connectionId: connection.id,
      cityX: connection.cityX,
      cityY: connection.cityY,
      width: connection.width
    });
    return Result.ok<Connection>(connection)
  }

}

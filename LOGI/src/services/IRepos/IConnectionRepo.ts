import { Repo } from "../../core/infra/Repo";
import {Connection} from "../../domain/connections/connection";

export default interface IConnectionRepo extends Repo<Connection> {
  save(connection: Connection): Promise<Connection>;
  findByDomainId (id: string): Promise<Connection>;
  findAll(): Promise<Connection[]>;

}

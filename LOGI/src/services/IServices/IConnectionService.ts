import { Result } from "../../core/logic/Result";
import IConnectionDTO from "../../dto/IConnectionDTO";

export default interface IConnectionService  {
  createConnection(connectionDTO: IConnectionDTO): Promise<Result<IConnectionDTO>>;
  updateConnection(connectionDTO: IConnectionDTO): Promise<Result<IConnectionDTO>>;
  getAll() : Promise<Result<IConnectionDTO[]>>;
  getConnection (connectionId: string): Promise<Result<IConnectionDTO>>;
}

import {Service, Inject} from 'typedi';
import config from "../../config";
import IConnectionDTO from '../dto/IConnectionDTO';
import {Connection} from "../domain/connections/connection";
import IConnectionRepo from '../services/IRepos/IConnectionRepo';
import IConnectionService from './IServices/IConnectionService';
import {Result} from "../core/logic/Result";
import {ConnectionMap} from "../mappers/ConnectionMap";

@Service()
export default class ConnectionService implements IConnectionService {
  constructor(
    @Inject(config.repos.connection.name) private connectionRepo: IConnectionRepo
  ) {
  }

  public async getAll(): Promise<Result<IConnectionDTO[]>> {
    const connection_list = await this.connectionRepo.findAll();

    if (connection_list === null) {
      return Result.fail<IConnectionDTO[]>("Can't get connections");
    }

    return Result.ok(connection_list.map(result => ConnectionMap.toDTO(result)))
  }

  public async getConnection(connectionId: string): Promise<Result<IConnectionDTO>> {
    try {
      const connection = await this.connectionRepo.findByDomainId(connectionId);

      if (connection === null) {
        return Result.fail<IConnectionDTO>("Connection not found");
      } else {
        const connectionDTOResult = ConnectionMap.toDTO(connection) as IConnectionDTO;
        return Result.ok<IConnectionDTO>(connectionDTOResult)
      }
    } catch (e) {
      return Result.fail<IConnectionDTO>(e.toString());
    }
  }


  private async tryToCreateConnection(connectionDTO: IConnectionDTO): Promise<Result<IConnectionDTO>> {
    const connectionOrError = await Connection.create(connectionDTO);

    if (connectionOrError.isFailure) {
      return Result.fail<IConnectionDTO>(connectionOrError.errorValue());
    }

    const connectionResult = connectionOrError.getValue();

    await this.connectionRepo.save(connectionResult);

    const connectionDTOResult = ConnectionMap.toDTO(connectionResult) as IConnectionDTO;
    return Result.ok<IConnectionDTO>(connectionDTOResult)
  }

  public async createConnection(connectionDTO: IConnectionDTO): Promise<Result<IConnectionDTO>> {
    try {
      const connection = await this.connectionRepo.findByDomainId(connectionDTO.connectionId);
      if (connection === null) {
        return this.tryToCreateConnection(connectionDTO);
      } else {
        return Result.fail<IConnectionDTO>("A connection with ID[" + connection.connectionId + "] already exists!");
      }
    } catch (e) {
      return this.tryToCreateConnection(connectionDTO);
    }
  }

  public async updateConnection(connectionDTO: IConnectionDTO): Promise<Result<IConnectionDTO>> {
    try {
      const connection = await this.connectionRepo.findByDomainId(connectionDTO.connectionId);

      if (connection === null) {
        return Result.fail<IConnectionDTO>("Connection not found");
      } else {
        connection.connectionId = connectionDTO.connectionId

        Connection.validate(connection.connectionId, connection.cityX, connection.cityY, connection.width)

        await this.connectionRepo.save(connection);

        const connectionDTOResult = ConnectionMap.toDTO(connection) as IConnectionDTO;
        return Result.ok<IConnectionDTO>(connectionDTOResult)
      }
    } catch (e) {
      return Result.fail<IConnectionDTO>(e.toString());
    }
  }

}

import { Service, Inject } from 'typedi';
import config from "../../config";
import IPathDTO from '../dto/IPathDTO';
import { Path } from "../domain/paths/path";
import IPathRepo from '../services/IRepos/IPathRepo';
import IPathService from './IServices/IPathService';
import { Result } from "../core/logic/Result";
import { PathMap } from "../mappers/PathMap";
import {WarehouseId} from "../domain/warehouses/warehouseId";
import {PathDistance} from "../domain/paths/pathDistance";
import {Duration} from "../domain/paths/duration";
import {ConsumedEnergy} from "../domain/paths/consumedEnergy";
import ITruckDTO from "../dto/ITruckDTO";

const axios = require('axios');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

@Service()
export default class PathService implements IPathService {
  constructor(
    @Inject(config.repos.path.name) private pathRepo : IPathRepo
  ) {}

  public async getAll(): Promise<Result<IPathDTO[]>> {
    const path_list = await this.pathRepo.findAll();

    if (path_list === null) {
      return Result.fail<IPathDTO[]>("Can't get paths");
    }

    return Result.ok(path_list.map(result => PathMap.toDTO(result)))
  }

  public async getByArrivalWarehouse(arrivalWarehouse: string): Promise<Result<IPathDTO[]>> {
    const path_list = await this.pathRepo.findByArrivalWarehouse(arrivalWarehouse);
    if (path_list===null || path_list.length===0){
      return Result.fail<IPathDTO[]>("There were not found any paths matching that Arrival Warehouse");
    }
    return Result.ok(path_list.map(result => PathMap.toDTO(result)))
  }

  public async getByWarehouses(departureWarehouse: string, arrivalWarehouse: string): Promise<Result<IPathDTO[]>> {
    const path_list = await this.pathRepo.findByWarehouses(departureWarehouse,arrivalWarehouse);
    if (path_list===null || path_list.length===0){
      return Result.fail<IPathDTO[]>("There were not found any paths matching that Arrival Warehouse");
    }
    return Result.ok(path_list.map(result => PathMap.toDTO(result)))
  }

  public async getByDepartureWarehouse(departureWarehouse: string): Promise<Result<IPathDTO[]>> {
    const path_list = await this.pathRepo.findByDepartureWarehouse(departureWarehouse);
    if (path_list===null || path_list.length===0){
      return Result.fail<IPathDTO[]>("There were not found any paths matching that Departure Warehouse");
    }
    return Result.ok(path_list.map(result => PathMap.toDTO(result)))
  }

  public async getPath( pathId: string): Promise<Result<IPathDTO>> {
    try {
      const path = await this.pathRepo.findByDomainId(pathId);

      if (path === null) {
        return Result.fail<IPathDTO>("Path not found");
      }
      else {
        const pathDTOResult = PathMap.toDTO( path ) as IPathDTO;
        return Result.ok<IPathDTO>( pathDTOResult )
      }
    } catch (e) {
      return Result.fail<IPathDTO>(e.toString());
    }
  }

  public async getById( pathId: string): Promise<Result<IPathDTO[]>> {
    const path_list = await this.pathRepo.findById(pathId);
    if (path_list===null || path_list.length===0){
      return Result.fail<IPathDTO[]>("There were not found any paths matching that id");
    }
    return Result.ok(path_list.map(result => PathMap.toDTO(result)))
  }

  public async findPagesForNResults(nResults: number): Promise<Result<number>> {
    const numberOfPages = await this.pathRepo.findPagesForNResults(nResults);
    if (numberOfPages===null || numberOfPages===0){
      return Result.fail<number>("There's not enough paths to paginate yet.");
    }
    return Result.ok(numberOfPages)
  }

  public async findFirstNResults(nResults: number, page: number): Promise<Result<IPathDTO[]>> {
    const path_list = await this.pathRepo.findFirstNResults(nResults, page);
    if (path_list===null || path_list.length===0){
      return Result.fail<IPathDTO[]>("There were not found any paths that met your parameters");
    }
    return Result.ok(path_list.map(result => PathMap.toDTO(result)))
  }


  public async createPath(pathDTO: IPathDTO): Promise<Result<IPathDTO>> {
    try {

      const pathOrError = await Path.create( pathDTO );

      if (pathOrError.isFailure) {
        return Result.fail<IPathDTO>(pathOrError.errorValue());
      }

      const pathResult = pathOrError.getValue();

      //Check if Warehouses are valid
      await this.checkIfWarehousesExist(pathResult);
      await this.checkIfAlreadyPathExists(pathResult);

      await this.pathRepo.save(pathResult);

      const pathDTOResult = PathMap.toDTO( pathResult ) as IPathDTO;
      return Result.ok<IPathDTO>( pathDTOResult )
    } catch (e) {
      return Result.fail<IPathDTO>(e.toString());
    }
  }

  public async updatePath(pathDTO: IPathDTO): Promise<Result<IPathDTO>> {
    try {
      const path = await this.pathRepo.findByDomainId(pathDTO.id);

      if (path === null) {
        return Result.fail<IPathDTO>("Path not found");
      }
      else {
        let departureWarehouse = WarehouseId.create(pathDTO.departureWarehouse);
        if (departureWarehouse.isSuccess){
          path.departureWarehouse = departureWarehouse.getValue()
        }else {
          throw new Error(departureWarehouse.error.toString())
        }
        let arrivalWarehouse = WarehouseId.create(pathDTO.arrivalWarehouse);
        if (arrivalWarehouse.isSuccess){
          path.arrivalWarehouse = arrivalWarehouse.getValue()
        }else {
          throw new Error(arrivalWarehouse.error.toString())
        }
        let distance = PathDistance.create(pathDTO.distance);
        if (distance.isSuccess){
          path.distance = distance.getValue()
        }else {
          throw new Error(distance.error.toString())
        }
        let duration = Duration.create(pathDTO.duration);
        if (duration.isSuccess){
          path.duration = duration.getValue()
        }else {
          throw new Error(duration.error.toString())
        }
        let consumedEnergy = ConsumedEnergy.create(pathDTO.consumedEnergy);
        if (consumedEnergy.isSuccess){
          path.consumedEnergy = consumedEnergy.getValue()
        }else {
          throw new Error(consumedEnergy.error.toString())
        }

        //Check if Warehouses are valid
        await this.checkIfWarehousesExist(path);

        await this.pathRepo.save(path);

        const pathDTOResult = PathMap.toDTO( path ) as IPathDTO;
        return Result.ok<IPathDTO>( pathDTOResult )
      }
    } catch (e) {
      return Result.fail<IPathDTO>(e.toString());
    }
  }

  private async checkIfAlreadyPathExists(path: Path){
    const path1 = await this.pathRepo.findByWarehouses(path.departureWarehouse, path.arrivalWarehouse);
    if (path1!==null){
      throw new Error("There's already a path with that departure warehouse and arrival warehouse")
    }
  }

  private async checkIfWarehousesExist(path: Path){

    let departureWarehouse;
    let arrivalWarehouse;

    if (path.departureWarehouse.value===path.arrivalWarehouse.value){
      throw new Error("Departure Warehouse cannot be equal to Arrival Warehouse!")
    }

    try{
      await axios.get('https://vs614.dei.isep.ipp.pt/wm/api/warehouse/' + path.departureWarehouse.value)
        .then(response => {
          departureWarehouse = response.data.departureWarehouse;
        }).catch(() => {
          throw new Error("Departure Warehouse does not exist!")
        });
      await axios.get('https://vs614.dei.isep.ipp.pt/wm/api/warehouse/' + path.arrivalWarehouse.value)
        .then(response => {
          arrivalWarehouse = response.data.arrivalWarehouse;
        }).catch(() => {
          throw new Error("Arrival Warehouse does not exist!")
        });
    }catch (e) {
      if (e.toString().includes("Arrival") || e.toString().includes("Departure")){
        throw new Error(e.toString().replace("Error: ",""))
      }else {
        throw new Error("Cannot communicate with Warehouse Management Module")
      }
    }
  }
}

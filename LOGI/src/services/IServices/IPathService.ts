import { Result } from "../../core/logic/Result";
import IPathDTO from "../../dto/IPathDTO";

export default interface IPathService  {
  createPath(pathDTO: IPathDTO): Promise<Result<IPathDTO>>;
  updatePath(pathDTO: IPathDTO): Promise<Result<IPathDTO>>;
  getAll() : Promise<Result<IPathDTO[]>>;
  getByDepartureWarehouse(departureWarehouse: string) : Promise<Result<IPathDTO[]>>;
  getByArrivalWarehouse(arrivalWarehouse: string) : Promise<Result<IPathDTO[]>>;
  getByWarehouses(departureWarehouse: string, arrivalWarehouse: string) : Promise<Result<IPathDTO[]>>;

  getPath (pathId: string): Promise<Result<IPathDTO>>;
  getById (pathId: string): Promise<Result<IPathDTO[]>>;
  findFirstNResults (nResults: number, page: number): Promise<Result<IPathDTO[]>>;
  findPagesForNResults (nResults: number): Promise<Result<number>>;
}

import { Result } from "../../core/logic/Result";
import ILocationDTO from "../../dto/ILocationDTO";

export default interface ILocationService  {
  createLocation(locationDTO: ILocationDTO): Promise<Result<ILocationDTO>>;
  updateLocation(locationDTO: ILocationDTO): Promise<Result<ILocationDTO>>;
  getAll() : Promise<Result<ILocationDTO[]>>;
  getLocation (locationId: string): Promise<Result<ILocationDTO>>;
}

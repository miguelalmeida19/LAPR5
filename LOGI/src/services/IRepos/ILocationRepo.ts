import { Repo } from "../../core/infra/Repo";
import {Location} from "../../domain/locations/location";

export default interface ILocationRepo extends Repo<Location> {
  save(location: Location): Promise<Location>;
  findByDomainId (id: string): Promise<Location>;
  findAll(): Promise<Location[]>;

}

import {Service, Inject} from 'typedi';
import config from "../../config";
import ILocationDTO from '../dto/ILocationDTO';
import {Location} from "../domain/locations/location";
import ILocationRepo from '../services/IRepos/ILocationRepo';
import ILocationService from './IServices/ILocationService';
import {Result} from "../core/logic/Result";
import {LocationMap} from "../mappers/LocationMap";

@Service()
export default class LocationService implements ILocationService {
  constructor(
    @Inject(config.repos.location.name) private locationRepo: ILocationRepo
  ) {
  }

  public async getAll(): Promise<Result<ILocationDTO[]>> {
    const location_list = await this.locationRepo.findAll();

    if (location_list === null) {
      return Result.fail<ILocationDTO[]>("Can't get locations");
    }

    return Result.ok(location_list.map(result => LocationMap.toDTO(result)))
  }

  public async getLocation(locationId: string): Promise<Result<ILocationDTO>> {
    try {
      const location = await this.locationRepo.findByDomainId(locationId);

      if (location === null) {
        return Result.fail<ILocationDTO>("Location not found");
      } else {
        const locationDTOResult = LocationMap.toDTO(location) as ILocationDTO;
        return Result.ok<ILocationDTO>(locationDTOResult)
      }
    } catch (e) {
      return Result.fail<ILocationDTO>(e.toString());
    }
  }


  private async tryToCreateLocation(locationDTO: ILocationDTO): Promise<Result<ILocationDTO>> {
    const locationOrError = await Location.create(locationDTO);

    if (locationOrError.isFailure) {
      return Result.fail<ILocationDTO>(locationOrError.errorValue());
    }

    const locationResult = locationOrError.getValue();

    await this.locationRepo.save(locationResult);

    const locationDTOResult = LocationMap.toDTO(locationResult) as ILocationDTO;
    return Result.ok<ILocationDTO>(locationDTOResult)
  }

  public async createLocation(locationDTO: ILocationDTO): Promise<Result<ILocationDTO>> {
    try {
      const location = await this.locationRepo.findByDomainId(locationDTO.locationId);
      if (location === null) {
        return this.tryToCreateLocation(locationDTO);
      } else {
        return Result.fail<ILocationDTO>("A location with ID[" + location.locationId + "] already exists!");
      }
    } catch (e) {
      return this.tryToCreateLocation(locationDTO);
    }
  }

  public async updateLocation(locationDTO: ILocationDTO): Promise<Result<ILocationDTO>> {
    try {
      const location = await this.locationRepo.findByDomainId(locationDTO.locationId);

      if (location === null) {
        return Result.fail<ILocationDTO>("Location not found");
      } else {
        location.locationId = locationDTO.locationId

        Location.validate(location.locationId,
          location.name, location.latitude, location.longitude,
          location.altitude, location.warehouseOrientation,
          location.warehouseModelUrl, location.nodeRadius)

        await this.locationRepo.save(location);

        const locationDTOResult = LocationMap.toDTO(location) as ILocationDTO;
        return Result.ok<ILocationDTO>(locationDTOResult)
      }
    } catch (e) {
      return Result.fail<ILocationDTO>(e.toString());
    }
  }

}

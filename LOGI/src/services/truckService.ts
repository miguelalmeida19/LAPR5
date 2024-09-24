import {Service, Inject} from 'typedi';
import config from "../../config";
import ITruckDTO from '../dto/ITruckDTO';
import {Truck} from "../domain/trucks/truck";
import ITruckRepo from '../services/IRepos/ITruckRepo';
import ITruckService from './IServices/ITruckService';
import {Result} from "../core/logic/Result";
import {TruckMap} from "../mappers/TruckMap";
import IPathDTO from "../dto/IPathDTO";
import {Tare} from "../domain/trucks/tare";
import {Capacity} from "../domain/trucks/capacity";
import {BatteryCharge} from "../domain/trucks/batteryCharge";
import {Autonomy} from "../domain/trucks/autonomy";
import {RechargeBattery} from "../domain/trucks/rechargeBattery";

@Service()
export default class TruckService implements ITruckService {
  constructor(
    @Inject(config.repos.truck.name) private truckRepo: ITruckRepo
  ) {
  }

  public async getAll(): Promise<Result<ITruckDTO[]>> {
    const truck_list = await this.truckRepo.findAll();

    if (truck_list === null) {
      return Result.fail<ITruckDTO[]>("Can't get trucks");
    }

    return Result.ok(truck_list.map(result => TruckMap.toDTO(result)))
  }

  public async getTruck(truckId: string): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByDomainId(truckId);

      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found");
      } else {
        const truckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;
        return Result.ok<ITruckDTO>(truckDTOResult)
      }
    } catch (e) {
      return Result.fail<ITruckDTO>(e.toString());
    }

  }

  public async deactivateTruck(truckId: string): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.deactivateById(truckId);

      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found");
      } else {
        const truckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;
        return Result.ok<ITruckDTO>(truckDTOResult)
      }
    } catch (e) {
      return Result.fail<ITruckDTO>(e.toString());
    }

  }

  public async activateTruck(truckId: string): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.activateById(truckId);

      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found");
      } else {
        const truckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;
        return Result.ok<ITruckDTO>(truckDTOResult)
      }
    } catch (e) {
      return Result.fail<ITruckDTO>(e.toString());
    }

  }



  private async tryToCreateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    const truckOrError = await Truck.create(truckDTO);

    if (truckOrError.isFailure) {
      return Result.fail<ITruckDTO>(truckOrError.errorValue());
    }

    const truckResult = truckOrError.getValue();

    await this.truckRepo.save(truckResult);

    const truckDTOResult = TruckMap.toDTO(truckResult) as ITruckDTO;
    return Result.ok<ITruckDTO>(truckDTOResult)
  }

  public async createTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByDomainId(truckDTO.truckId);
      if (truck === null) {
        return this.tryToCreateTruck(truckDTO);
      } else {
        return Result.fail<ITruckDTO>("A truck with ID[" + truck.truckId.value + "] already exists!");
      }
    } catch (e) {
      return this.tryToCreateTruck(truckDTO);
    }
  }

  public async updateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByDomainId(truckDTO.truckId);

      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found");
      } else if (truck.active==false){
        return Result.fail<ITruckDTO>("That truck is not active.\n You should activate it first.");

      }else{
        let tare = Tare.create(truckDTO.tare);
        if (tare.isSuccess){
          truck.tare = tare.getValue()
        }else {
          throw new Error(tare.error.toString())
        }
        let capacity = Capacity.create(truckDTO.capacity);
        if (capacity.isSuccess){
          truck.capacity = capacity.getValue()
        }else {
          throw new Error(capacity.error.toString())
        }
        let batteryCharge = BatteryCharge.create(truckDTO.batteryCharge);
        if (batteryCharge.isSuccess){
          truck.batteryCharge = batteryCharge.getValue()
        }else {
          throw new Error(batteryCharge.error.toString())
        }
        let autonomy = Autonomy.create(truckDTO.autonomy);
        if (autonomy.isSuccess){
          truck.autonomy = autonomy.getValue()
        }else {
          throw new Error(autonomy.error.toString())
        }
        let rechargeBattery = RechargeBattery.create(truckDTO.rechargeBattery);
        if (rechargeBattery.isSuccess){
          truck.rechargeBattery = rechargeBattery.getValue()
        }else {
          throw new Error(rechargeBattery.error.toString())
        }

        Truck.validate(truck.truckId, truck.tare, truck.capacity, truck.batteryCharge, truck.autonomy, truck.rechargeBattery)

        await this.truckRepo.save(truck);

        const truckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;
        return Result.ok<ITruckDTO>(truckDTOResult)
      }
    } catch (e) {
      return Result.fail<ITruckDTO>(e.toString());
    }
  }

}

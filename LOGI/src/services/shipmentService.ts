import {Inject, Service} from "typedi";
import config from "../../config";

import {Result} from "../core/logic/Result";
import IShipmentService from "./IServices/IShipmentService";
import IShipmentRepo from "./IRepos/IShipmentRepo";
import ITruckRepo from "./IRepos/ITruckRepo";
import IShipmentDTO from "../dto/IShipmentDTO";
import {ShipmentMap} from "../mappers/ShipmentMap";
import {Shipment} from "../domain/shipments/shipment";
import {TruckId} from "../domain/trucks/truckId";

@Service()
export default class ShipmentService implements IShipmentService {
  constructor(
    @Inject(config.repos.shipment.name) private shipmentRepo: IShipmentRepo,
    @Inject(config.repos.truck.name) private truckRepo: ITruckRepo
  ) {}

  public async getAll(): Promise<Result<IShipmentDTO[]>> {
    const shipmentList = await this.shipmentRepo.findAll();

    if (shipmentList === null) {
      return Result.fail<IShipmentDTO[]>("Service Error - Unable to get Shipments");
    }
    return Result.ok(shipmentList.map(result => ShipmentMap.toDTO(result)));
  }

  public async getById(shipmentId: string): Promise<Result<IShipmentDTO[]>> {
    const shipmentList = await this.shipmentRepo.findByDomainId(shipmentId);

    if(shipmentList === null) {
      return Result.fail<IShipmentDTO[]>("Service Error - No Shipments matching the given ID");
    }
    return Result.ok(shipmentList.map(result => ShipmentMap.toDTO(result)));
  }

  public async getShipment(shipmentId: string): Promise<Result<IShipmentDTO>> {
    try {
      const shipment = await this.shipmentRepo.findByShipmentId(shipmentId);

      if (shipment === null) return Result.fail<IShipmentDTO>("Service Error - Shipment not found");
      else {
        const shipmentDTOResult = ShipmentMap.toDTO(shipment) as IShipmentDTO;
        return Result.ok<IShipmentDTO>(shipmentDTOResult);
      }
    } catch (e) {
      return Result.fail<IShipmentDTO>(e.toString());
    }
  }

  public async getByTruckId(truckId: string): Promise<Result<IShipmentDTO[]>> {
    const shipmentList = await this.shipmentRepo.findByTruck(truckId);

    if (shipmentList === null || shipmentList.length === 0) {
      return Result.fail<IShipmentDTO[]>("Service Error - No Shipments delivered by the given Truck ID");
    }
    return Result.ok(shipmentList.map(result => ShipmentMap.toDTO(result)));
  }

  private async tryToCreateShipment(shipmentDTO : IShipmentDTO): Promise<Result<IShipmentDTO>> {
    const shipmentOrError = await Shipment.create(shipmentDTO);

    if (shipmentOrError.isFailure) return Result.fail<IShipmentDTO>(shipmentOrError.errorValue());

    const shipmentResult = shipmentOrError.getValue();

    await this.checkIfTruckExists(shipmentResult);
    await this.checkIfShipmentExists(shipmentResult);

    await this.shipmentRepo.save(shipmentResult);

    const shipmentDTOResult = ShipmentMap.toDTO(shipmentResult) as IShipmentDTO;
    return Result.ok<IShipmentDTO>(shipmentDTOResult);
  }

  public async createShipment(shipmentDTO: IShipmentDTO): Promise<Result<IShipmentDTO>> {
    try {
      const shipment = await this.shipmentRepo.findByShipmentId(shipmentDTO.shipmentId);

      if (shipment === null) return this.tryToCreateShipment(shipmentDTO);
      else return Result.fail<IShipmentDTO>("Service Error - Unable to create Shipment");
    } catch (e) {
      return this.tryToCreateShipment(shipmentDTO);
    }
  }

  public async updateShipment(shipmentDTO: IShipmentDTO): Promise<Result<IShipmentDTO>> {
    try {
      const shipment = await this.shipmentRepo.findByShipmentId(shipmentDTO.shipmentId);

      if (shipment === null) return Result.fail<IShipmentDTO>("Service Error - Shipment not found when Updating");
      else {
        let truckId = TruckId.create(shipmentDTO.truckId);
        if (truckId.isSuccess) shipment.truckId = truckId.getValue();
        else throw new Error(truckId.error.toString());

        await Shipment.validate(shipmentDTO.toBeDeliveredDay, shipmentDTO.toBeDeliveredMonth, shipmentDTO.toBeDeliveredYear);
        shipment.toBeDeliveredDay = shipmentDTO.toBeDeliveredDay;
        shipment.toBeDeliveredMonth = shipmentDTO.toBeDeliveredMonth;
        shipment.toBeDeliveredYear = shipmentDTO.toBeDeliveredYear;

        await this.checkIfTruckExists(shipment);
        await this.shipmentRepo.save(shipment);

        const shipmentDTOResult = ShipmentMap.toDTO(shipment) as IShipmentDTO;
        return Result.ok<IShipmentDTO>(shipmentDTOResult);
      }
    } catch (e) {
      return Result.fail<IShipmentDTO>(e.toString());
    }
  }

  private async checkIfTruckExists(shipment: Shipment) {
    const truck = await this.truckRepo.findByDomainId(shipment.truckId.value);
    if (truck === null) throw new Error("Service Error - Truck does not exist");
  }

  private async checkIfShipmentExists(shipment: Shipment) {
    const _shipment = await this.shipmentRepo.findByShipmentId(shipment.shipmentId.value);
    if (_shipment !== null) throw new Error("Service Error - Shipment already exists!");
  }

  public async findPagesForNResults(nResults: number): Promise<Result<number>> {
    const numberOfPages = await this.shipmentRepo.findPagesForNResults(nResults);
    return numberOfPages === null || numberOfPages === 0 ?
      Result.fail<number>("There's not enough packages to paginate yet.") : Result.ok(numberOfPages);
  }

  public async findFirstNResults(nResults: number, page: number): Promise<Result<IShipmentDTO[]>> {
    const list = await this.shipmentRepo.findFirstNResults(nResults, page);
    return list === null || list.length === 0 ?
      Result.fail<IShipmentDTO[]>("There were not found any shipments that met your parameters") :
      Result.ok(list.map(result => ShipmentMap.toDTO(result)));
  }

}

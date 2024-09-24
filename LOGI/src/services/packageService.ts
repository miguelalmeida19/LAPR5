import {Inject, Service} from "typedi";
import config from "../../config";

import {Result} from "../core/logic/Result";
import IPackageService from "./IServices/IPackageService";
import IPackageRepo from "./IRepos/IPackageRepo";
import IShipmentRepo from "./IRepos/IShipmentRepo";
import IPathRepo from "./IRepos/IPathRepo";
import IPackageDTO from "../dto/IPackageDTO";
import {PackageMap} from "../mappers/PackageMap";
import {Package} from "../domain/packages/package";
import {ShipmentId} from "../domain/shipments/shipmentId";
import {DeliveryId} from "../domain/deliveries/deliveryId";

const axios = require('axios');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

@Service()
export default class PackageService implements IPackageService {
  constructor(
    @Inject(config.repos.package.name) private packageRepo: IPackageRepo,
    @Inject(config.repos.shipment.name) private shipmentRepo: IShipmentRepo,
    @Inject(config.repos.path.name) private pathRepo: IPathRepo
  ) {}

  public async getAll(): Promise<Result<IPackageDTO[]>> {
    const l = await this.packageRepo.findAll();
    if (l === null) return Result.fail<IPackageDTO[]>("Service Error - Unable to get Packages");
    return Result.ok(l.map(result => PackageMap.toDTO(result)));
  }

  public async getById(packageId: string): Promise<Result<IPackageDTO[]>> {
    const l = await this.packageRepo.findByDomainId(packageId);
    if (l === null || l.length === 0) {
      return Result.fail<IPackageDTO[]>("Service Error - No Packages matching the given ID");
    }
    return Result.ok(l.map(result => PackageMap.toDTO(result)));
  }

  public async getPackage(packageId: string): Promise<Result<IPackageDTO>> {
    try {
      const p = await this.packageRepo.findByPackageId(packageId);
      if (p === null) return Result.fail<IPackageDTO>("Service Error - Package not found");
      else {
        const dtoResult = PackageMap.toDTO(p) as IPackageDTO;
        return Result.ok<IPackageDTO>(dtoResult);
      }
    } catch (e) {
      return Result.fail<IPackageDTO>(e.toString());
    }
  }

  public async getByDeliveryId(deliveryId: string): Promise<Result<IPackageDTO>> {
    const x = await this.packageRepo.findByDelivery(deliveryId);
    if (x !== null) throw new Error("Service Error - There is already a Package for the given Delivery");
    return Result.ok(PackageMap.toDTO(x));
  }

  public async getByShipmentId(shipmentId: string): Promise<Result<IPackageDTO[]>> {
    const l = await this.packageRepo.findByShipment(shipmentId);
    if (l === null || l.length === 0) {
      return Result.fail<IPackageDTO[]>("Service Error - No Packages matching the given Shipment ID");
    }
    return Result.ok(l.map(result => PackageMap.toDTO(result)));
  }

  public async getByPathId(pathId: string): Promise<Result<IPackageDTO[]>> {
    const l = await this.packageRepo.findByPath(pathId);
    if (l === null || l.length === 0) {
      return Result.fail<IPackageDTO[]>("Service Error - No Packages matching the given Path ID");
    }
    return Result.ok(l.map(result => PackageMap.toDTO(result)));
  }

  private async tryToCreatePackage(packageDTO: IPackageDTO): Promise<Result<IPackageDTO>> {
    const packageOrError = await Package.create(packageDTO);
    if (packageOrError.isFailure) return Result.fail<IPackageDTO>(packageOrError.errorValue());

    const packageResult = packageOrError.getValue();

    await this.checkIfDeliveryExists(packageResult);
    await this.checkIfShipmentExists(packageResult);
    await this.checkIfPackageIsAssignedToDelivery(packageResult);
    await this.checkIfPathIsValidForPackage(packageResult);

    await this.packageRepo.save(packageResult);

    const dtoResult = PackageMap.toDTO(packageResult) as IPackageDTO;
    return Result.ok<IPackageDTO>(dtoResult);
  }

  public async createPackage(packageDTO: IPackageDTO): Promise<Result<IPackageDTO>> {
    try {
      const p = await this.packageRepo.findByPackageId(packageDTO.packageId);
      if (p === null) return this.tryToCreatePackage(packageDTO);
      else return Result.fail<IPackageDTO>("Service Error - There is already a Package with the given ID");
    } catch (e) {
      return this.tryToCreatePackage(packageDTO);
    }
  }

  public async updatePackage(packageDTO: IPackageDTO): Promise<Result<IPackageDTO>> {
    try {
      const p = await this.packageRepo.findByPackageId(packageDTO.packageId);
      if (p === null) return Result.fail<IPackageDTO>("Service Error - Package not found when Updating");
      else {
        let shipmentId = ShipmentId.create(packageDTO.shipmentId);
        if (shipmentId.isSuccess) p.shipmentId = shipmentId.getValue();
        else throw new Error(shipmentId.error.toString());

        let deliveryId = DeliveryId.create(packageDTO.deliveryId);
        if (deliveryId.isSuccess) p.deliveryId = deliveryId.getValue();
        else throw new Error(deliveryId.error.toString());

        await this.checkIfDeliveryExists(p);
        await this.checkIfShipmentExists(p);
        await this.checkIfPackageIsAssignedToDelivery(p);
        await this.checkIfPathIsValidForPackage(p);

        await this.packageRepo.save(p);

        const dtoResult = PackageMap.toDTO(p) as IPackageDTO;
        return Result.ok<IPackageDTO>(dtoResult);
      }
    } catch (e) {
      return Result.fail<IPackageDTO>(e.toString());
    }
  }

  private async checkIfPackageIsAssignedToDelivery(p: Package) {
    let x = await this.packageRepo.findByDelivery(p.deliveryId);
    if (x !== null) throw new Error("Service Error - There is already a Package for the given Delivery");
  }

  private async checkIfShipmentExists(p: Package) {
    const shipment = await this.shipmentRepo.findByShipmentId(p.shipmentId.value);
    if (shipment === null) throw new Error("Service Error - Shipment does not exist");
  }

  private async checkIfPathIsValidForPackage(p: Package) {
    const x = await this.pathRepo.findByDomainId(p.pathId);
    if (x === null) throw new Error("Service Error - Path does not exist");

    let _warehouseId;
    try {
      await axios.get('https://vs614.dei.isep.ipp.pt/wm/api/deliveries/' + p.deliveryId.value)
        .then(response => {
          _warehouseId = response.data.warehouseId;
        }).catch(() => {
          throw new Error("Service Error - Delivery does not exist");
        });
    } catch (e) {
      if (e.toString().includes("Delivery")) {
        throw new Error(e.toString().replace("Error: ", ""));
      } else {
        throw new Error("Service Error - Unable to communicate with Warehouse Management Module");
      }
    }
    let _path = await this.pathRepo.findByDomainId(p.pathId);
    let _arrivalWarehouseId;
    if (_path !== null) {
      _arrivalWarehouseId = _path.arrivalWarehouse.value;
    } else throw new Error("Service Error - Path does not exist");
    if (_arrivalWarehouseId.toString() != _warehouseId.toString())
      throw new Error("Service Error - Path not suitable for this Package");
  }

  private async checkIfDeliveryExists(p: Package) {
    let deliveryId;
    try {
      await axios.get('https://vs614.dei.isep.ipp.pt/wm/api/deliveries/' + p.deliveryId.value)
        .then(response => {
          deliveryId = response.data.deliveryId;
        }).catch(() => {
          throw new Error("Service Error - Delivery does not exist");
        });
    } catch (e) {
      if (e.toString().includes("Delivery")) {
        throw new Error(e.toString().replace("Error: ", ""));
      } else {
        throw new Error("Service Error - Unable to communicate with Warehouse Management Module");
      }
    }
  }

  public async findPagesForNResults(nResults: number): Promise<Result<number>> {
    const numberOfPages = await this.packageRepo.findPagesForNResults(nResults);
    return numberOfPages === null || numberOfPages === 0 ?
      Result.fail<number>("There's not enough packages to paginate yet.") : Result.ok(numberOfPages);
  }

  public async findFirstNResults(nResults: number, page: number): Promise<Result<IPackageDTO[]>> {
    const list = await this.packageRepo.findFirstNResults(nResults, page);
    return list === null || list.length === 0 ?
      Result.fail<IPackageDTO[]>("There were not found any packages that met your parameters") :
      Result.ok(list.map(result => PackageMap.toDTO(result)));
  }

}

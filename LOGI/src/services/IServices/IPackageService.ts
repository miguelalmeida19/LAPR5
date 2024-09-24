import {Result} from "../../core/logic/Result";
import IPackageDTO from "../../dto/IPackageDTO";

export default interface IPackageService {
  createPackage(packageDTO: IPackageDTO): Promise<Result<IPackageDTO>>;
  updatePackage(packageDTO: IPackageDTO): Promise<Result<IPackageDTO>>;
  getAll(): Promise<Result<IPackageDTO[]>>;
  getPackage(packageId: string): Promise<Result<IPackageDTO>>;
  getById(packageId: string): Promise<Result<IPackageDTO[]>>;
  getByShipmentId(shipmentId: string): Promise<Result<IPackageDTO[]>>;
  getByDeliveryId(shipmentId: string): Promise<Result<IPackageDTO>>;
  getByPathId(pathId: string): Promise<Result<IPackageDTO[]>>;
  findFirstNResults (nResults: number, page: number): Promise<Result<IPackageDTO[]>>;
  findPagesForNResults (nResults: number): Promise<Result<number>>;
}

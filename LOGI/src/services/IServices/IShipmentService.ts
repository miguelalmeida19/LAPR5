import {Result} from "../../core/logic/Result";
import IShipmentDTO from "../../dto/IShipmentDTO";

export default interface IShipmentService {
  createShipment(shipmentDTO: IShipmentDTO): Promise<Result<IShipmentDTO>>;
  updateShipment(shipmentDTO: IShipmentDTO): Promise<Result<IShipmentDTO>>;
  getAll(): Promise<Result<IShipmentDTO[]>>;
  getByTruckId(truckId: string) : Promise<Result<IShipmentDTO[]>>;
  getShipment(shipmentId: string): Promise<Result<IShipmentDTO>>;
  getById(shipmentId: string): Promise<Result<IShipmentDTO[]>>;
  findFirstNResults (nResults: number, page: number): Promise<Result<IShipmentDTO[]>>;
  findPagesForNResults (nResults: number): Promise<Result<number>>;
}

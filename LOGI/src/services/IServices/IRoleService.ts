import { Result } from "../../core/logic/Result";
import IRoleDTO from "../../dto/IRoleDTO";
import ITruckDTO from "../../dto/ITruckDTO";

export default interface IRoleService  {
  createRole(roleDTO: IRoleDTO): Promise<Result<IRoleDTO>>;
  updateRole(roleDTO: IRoleDTO): Promise<Result<IRoleDTO>>;
  getAll() : Promise<Result<IRoleDTO[]>>;

  getRole (roleId: string): Promise<Result<IRoleDTO>>;
  getRoleByName (roleName: string): Promise<Result<IRoleDTO>>;
}

import { Result } from "../../core/logic/Result";
import { IUserDTO } from "../../dto/IUserDTO";
import {NextFunction, Request, Response} from "express";
import ITruckDTO from "../../dto/ITruckDTO";

export default interface IUserService  {
  getAll() : Promise<Result<IUserDTO[]>>;
  cancelAccount(email: string) : Promise<Result<IUserDTO>>;
  SignUp(userDTO: IUserDTO): Promise<Result<{userDTO: IUserDTO, token: string}>>;
  SignIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO, token: string }>>;
}

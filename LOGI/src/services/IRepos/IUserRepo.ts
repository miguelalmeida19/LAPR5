import { Repo } from "../../core/infra/Repo";
import { User } from "../../domain/users/user";
import { UserEmail } from "../../domain/users/userEmail";
import {Truck} from "../../domain/trucks/truck";

export default interface IUserRepo extends Repo<User> {
	save(user: User): Promise<User>;
	findByEmail (email: UserEmail | string): Promise<User>;
	findById (id: string): Promise<User>;
  findAll(): Promise<User[]>;
}

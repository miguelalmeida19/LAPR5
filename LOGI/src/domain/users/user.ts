import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";
import {Result} from "../../core/logic/Result";
import {UserId} from "./userId";
import {UserEmail} from "./userEmail";
import {Role} from "../roles/role";
import {UserPassword} from "./userPassword";
import {Guard} from "../../core/logic/Guard";
import {Document, Model} from "mongoose";
import {IUserPersistence} from "../../dataschema/IUserPersistence";
import {TruckId} from "../trucks/truckId";
import {Tare} from "../trucks/tare";
import {Capacity} from "../trucks/capacity";
import {BatteryCharge} from "../trucks/batteryCharge";
import {Autonomy} from "../trucks/autonomy";
import {RechargeBattery} from "../trucks/rechargeBattery";


interface UserProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: UserEmail;
  password: UserPassword;
  role: Role;
}

export class User extends AggregateRoot<UserProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get userId(): UserId {
    return UserId.caller(this.id)
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get firstName(): string {
    return this.props.firstName
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get phoneNumber(): string {
    return this.props.phoneNumber;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get role(): Role {
    return this.props.role;
  }

  set role(value: Role) {
    this.props.role = value;
  }

  set email(value: UserEmail) {
    this.props.email = value;
  }

  set firstName(value: string) {
    this.props.firstName = value;
  }

  set lastName(value: string) {
    this.props.lastName = value;
  }

  set phoneNumber(value: string) {
    this.props.phoneNumber = value;
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {

    const guardedProps = [
      {argument: props.firstName, argumentName: 'firstName'},
      {argument: props.lastName, argumentName: 'lastName'},
      {argument: props.phoneNumber, argumentName: 'phoneNumber'},
      {argument: props.email, argumentName: 'email'},
      {argument: props.role, argumentName: 'role'}
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message)
    } else {
      const user = new User({
        ...props
      }, id);

      return Result.ok<User>(user);
    }
  }

  public static createExisted(user: any | Model<IUserPersistence & Document>): Result<User> {
    user = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      password: user.password,
      role: user.role
    });
    return Result.ok<User>(user)
  }
}

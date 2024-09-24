import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {Result} from "../../core/logic/Result";
import ITruckDTO from "../../dto/ITruckDTO";
import {Document, Model} from "mongoose";
import {ITruckPersistence} from "../../dataschema/ITruckPersistence";
import {Tare} from "./tare";
import {Capacity} from "./capacity";
import {BatteryCharge} from "./batteryCharge";
import {Autonomy} from "./autonomy";
import {RechargeBattery} from "./rechargeBattery";
import {TruckId} from "./truckId";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";

interface TruckProps {
  truckId: TruckId;
  tare: Tare;
  capacity: Capacity;
  batteryCharge: BatteryCharge;
  autonomy: Autonomy;
  rechargeBattery: RechargeBattery;
  active: boolean
}

export class Truck extends AggregateRoot<TruckProps> {

  get id(): UniqueEntityID {
    return this._id;
  }

  get active(): boolean {
    return this.props.active;
  }

  get truckId(): TruckId {
    return this.props.truckId;
  }

  get tare(): Tare {
    return this.props.tare;
  }

  get capacity(): Capacity {
    return this.props.capacity;
  }

  get batteryCharge(): BatteryCharge {
    return this.props.batteryCharge;
  }

  get autonomy(): Autonomy {
    return this.props.autonomy;
  }

  get rechargeBattery(): RechargeBattery {
    return this.props.rechargeBattery;
  }

  set active(value: boolean) {
    this.props.active = value;
  }

  set truckId(value: TruckId) {
    this.props.truckId = value;
  }

  set tare(value: Tare) {
    this.props.tare = value;
  }

  set capacity(value: Capacity) {
    this.props.capacity = value;
  }

  set batteryCharge(value: BatteryCharge) {
    this.props.batteryCharge = value;
  }

  set autonomy(value: Autonomy) {
    this.props.autonomy = value;
  }

  set rechargeBattery(value: RechargeBattery) {
    this.props.rechargeBattery = value;
  }

  private constructor(props: TruckProps) {
    super(props);
  }

  public static validate(truckId: TruckId, tare: Tare, capacity: Capacity, batteryCharge: BatteryCharge, autonomy: Autonomy, rechargeBattery: RechargeBattery): void {

    const re = new RegExp("^([A-Z]{2}-\\d{2}-[A-Z]{2}|\\d{2}-[A-Z]{2}-\\d{2}|\\d{2}-\\d{2}-[A-Z]{2}|[A-Z]{2}-\\d{2}-\\d{2})$");
    if (!re.test(truckId.value)){
      throw new Error("Must provide a valid Portuguese car registration")
    }
    else if (tare.value <= 0) {
      throw new Error("Must provide a valid truck tare")
    } else if (capacity.value < 0) {
      throw new Error("Must provide a valid truck capacity")
    } else if (batteryCharge.value < 0) {
      throw new Error("Must provide a valid truck battery charge")
    } else if (autonomy.value < 0) {
      throw new Error("Must provide a valid truck autonomy")
    } else if (rechargeBattery.value < 0) {
      throw new Error("Must provide a valid truck recharge of battery time")
    }
  }

  public static create(truckDTO: ITruckDTO): Result<Truck> {
    const truckId = TruckId.create(truckDTO.truckId);
    if (truckId.isFailure){
      return Result.fail<Truck>('Must provide a valid truck id')
    }
    const tare = Tare.create(truckDTO.tare);
    if (tare.isFailure){
      return Result.fail<Truck>('Must provide a valid tare')
    }
    const capacity = Capacity.create(truckDTO.capacity);
    if (capacity.isFailure){
      return Result.fail<Truck>('Must provide a valid capacity')
    }
    const batteryCharge = BatteryCharge.create(truckDTO.batteryCharge);
    if (batteryCharge.isFailure){
      return Result.fail<Truck>('Must provide a valid battery charge')
    }
    const autonomy = Autonomy.create(truckDTO.autonomy);
    if (autonomy.isFailure){
      return Result.fail<Truck>('Must provide a valid autonomy')
    }
    const rechargeBattery = RechargeBattery.create(truckDTO.rechargeBattery);
    if (rechargeBattery.isFailure){
      return Result.fail<Truck>('Must provide a valid recharge battery')
    }

    this.validate(truckId.getValue(), tare.getValue(), capacity.getValue(), batteryCharge.getValue(), autonomy.getValue(), rechargeBattery.getValue());
    const truck = new Truck({
      truckId: truckId.getValue(),
      tare: tare.getValue(),
      capacity: capacity.getValue(),
      batteryCharge: batteryCharge.getValue(),
      autonomy: autonomy.getValue(),
      rechargeBattery: rechargeBattery.getValue(),
      active: truckDTO.active
    });
    return Result.ok<Truck>(truck)
  }

  public static createExisted(truck: any | Model<ITruckPersistence & Document>): Result<Truck> {

    const truckId = TruckId.create(truck.truckId)
    if (truckId.isFailure){
      return Result.fail<Truck>('Must provide a valid truck id')
    }
    const tare = Tare.create(truck.tare)
    if (tare.isFailure){
      return Result.fail<Truck>('Must provide valid a valid tare')
    }
    const capacity = Capacity.create(truck.capacity)
    if (capacity.isFailure){
      return Result.fail<Truck>('Must provide valid a capacity')
    }
    const batteryCharge = BatteryCharge.create(truck.batteryCharge)
    if (batteryCharge.isFailure){
      return Result.fail<Truck>('Must provide valid a battery charge')
    }
    const autonomy = Autonomy.create(truck.autonomy)
    if (autonomy.isFailure){
      return Result.fail<Truck>('Must provide valid a autonomy')
    }
    const rechargeBattery = RechargeBattery.create(truck.rechargeBattery)
    if (rechargeBattery.isFailure){
      return Result.fail<Truck>('Must provide valid a recharge battery')
    }

    this.validate(truckId.getValue(), tare.getValue(), capacity.getValue(), batteryCharge.getValue(), autonomy.getValue(), rechargeBattery.getValue());

    truck = new Truck({
      truckId: truckId.getValue(),
      tare: tare.getValue(),
      capacity: capacity.getValue(),
      batteryCharge: batteryCharge.getValue(),
      autonomy: autonomy.getValue(),
      rechargeBattery: rechargeBattery.getValue(),
      active: truck.active
    });
    return Result.ok<Truck>(truck)
  }

  public static deactivate(): void {

  }
}

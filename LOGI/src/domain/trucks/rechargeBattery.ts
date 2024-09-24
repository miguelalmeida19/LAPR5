import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface RechargeBatteryProps {
  value: number;
}

export class RechargeBattery extends ValueObject<RechargeBattery> {
  get value(): number {
    return this.props.value;
  }

  private constructor(props) {
    super(props)
  }

  public static create(rechargeBattery: number): Result<RechargeBattery> {
    const guardResult = Guard.againstNullOrUndefined(rechargeBattery, 'batteryCharge');
    const positiveResult = Guard.isPositive(rechargeBattery, 'rechargeBattery');
    if (!guardResult.succeeded) {
      return Result.fail<RechargeBattery>(guardResult.message);
    } else if (!positiveResult.succeeded) {
      return Result.fail<RechargeBattery>(positiveResult.message);
    } else {
      return Result.ok<RechargeBattery>(new RechargeBattery({value: rechargeBattery}))
    }
  }
}

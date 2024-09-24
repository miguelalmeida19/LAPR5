import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface BatteryChargeProps {
  value: number;
}

export class BatteryCharge extends ValueObject<BatteryCharge> {
  get value(): number {
    return this.props.value;
  }

  private constructor(props) {
    super(props)
  }

  public static create(batteryCharge: number): Result<BatteryCharge> {
    const guardResult = Guard.againstNullOrUndefined(batteryCharge, 'batteryCharge');
    const positiveResult = Guard.isPositive(batteryCharge, 'batteryCharge');

    if (!guardResult.succeeded) {
      return Result.fail<BatteryCharge>(guardResult.message);
    } else if (!positiveResult.succeeded) {
      return Result.fail<BatteryCharge>(positiveResult.message);
    } else {
      return Result.ok<BatteryCharge>(new BatteryCharge({value: batteryCharge}))
    }
  }
}

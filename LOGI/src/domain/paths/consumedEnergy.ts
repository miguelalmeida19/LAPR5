import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface ConsumedEnergyProps {
  value: number;
}

export class ConsumedEnergy extends ValueObject<ConsumedEnergyProps> {
  get value(): number {
    return this.props.value;
  }

  private constructor(props) {
    super(props)
  }

  public static create(consumedEnergy: number): Result<ConsumedEnergy> {
    const guardResult = Guard.againstNullOrUndefined(consumedEnergy, 'consumedEnergy');
    const positiveResult = Guard.isPositive(consumedEnergy, 'consumedEnergy');
    if (!guardResult.succeeded) {
      return Result.fail<ConsumedEnergy>(guardResult.message);
    } else if (!positiveResult.succeeded) {
      return Result.fail<ConsumedEnergy>(positiveResult.message);
    } else {
      return Result.ok<ConsumedEnergy>(new ConsumedEnergy({value: consumedEnergy}))
    }
  }
}

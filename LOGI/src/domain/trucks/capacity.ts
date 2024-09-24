import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface CapacityProps {
  value: number;
}

export class Capacity extends ValueObject<Capacity> {
  get value(): number {
    return this.props.value;
  }

  private constructor(props) {
    super(props)
  }

  public static create(capacity: number): Result<Capacity> {
    const guardResult = Guard.againstNullOrUndefined(capacity, 'capacity');
    const positiveResult = Guard.isPositive(capacity, 'capacity');
    if (!guardResult.succeeded) {
      return Result.fail<Capacity>(guardResult.message);
    } else if (!positiveResult.succeeded) {
      return Result.fail<Capacity>(positiveResult.message);
    } else {
      return Result.ok<Capacity>(new Capacity({value: capacity}))
    }
  }
}

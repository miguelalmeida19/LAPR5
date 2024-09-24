import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface DurationProps {
  value: number;
}

export class Duration extends ValueObject<DurationProps> {
  get value(): number {
    return this.props.value;
  }

  private constructor(props) {
    super(props)
  }

  public static create(duration: number): Result<Duration> {
    const guardResult = Guard.againstNullOrUndefined(duration, 'duration');
    const positiveResult = Guard.isPositive(duration, 'duration');

    if (!guardResult.succeeded) {
      return Result.fail<Duration>(guardResult.message);
    } else if (!positiveResult.succeeded) {
      return Result.fail<Duration>(positiveResult.message);
    } else {
      return Result.ok<Duration>(new Duration({value: duration}))
    }
  }
}

import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface TareProps {
  value: number;
}

export class Tare extends ValueObject<TareProps> {
  get value(): number {
    return this.props.value;
  }

  private constructor(props) {
    super(props)
  }

  public static create(tare: number): Result<Tare> {
    const guardResult = Guard.againstNullOrUndefined(tare, 'tare');
    const positiveResult = Guard.isPositive(tare, 'tare');
    if (!guardResult.succeeded) {
      return Result.fail<Tare>(guardResult.message);
    } else if (!positiveResult.succeeded) {
      return Result.fail<Tare>(positiveResult.message);
    } else {
      return Result.ok<Tare>(new Tare({value: tare}))
    }
  }
}

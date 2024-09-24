
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface AutonomyProps {
  value: number;
}

export class Autonomy extends ValueObject<Autonomy> {
  get value (): number {
    return this.props.value;
  }

  private constructor (props) {
    super(props)
  }

  public static create (autonomy: number): Result<Autonomy> {
    const guardResult = Guard.againstNullOrUndefined(autonomy, 'autonomy');
    const positiveResult = Guard.isPositive(autonomy, 'autonomy');
    if (!guardResult.succeeded) {
      return Result.fail<Autonomy>(guardResult.message);
    }
    else if (!positiveResult.succeeded){
      return Result.fail<Autonomy>(positiveResult.message);
    }
    else {
      return Result.ok<Autonomy>(new Autonomy({ value: autonomy }))
    }
  }
}

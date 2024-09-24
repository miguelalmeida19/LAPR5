import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface PathDistanceProps {
  value: number;
}

export class PathDistance extends ValueObject<PathDistanceProps> {
  get value(): number {
    return this.props.value;
  }

  private constructor(props) {
    super(props)
  }

  public static create(pathDistance: number): Result<PathDistance> {
    const guardResult = Guard.againstNullOrUndefined(pathDistance, 'pathDistance');
    const positiveResult = Guard.isPositive(pathDistance, 'pathDistance');

    if (!guardResult.succeeded) {
      return Result.fail<PathDistance>(guardResult.message);
    } else if (!positiveResult.succeeded) {
      return Result.fail<PathDistance>(positiveResult.message);
    } else {
      return Result.ok<PathDistance>(new PathDistance({value: pathDistance}))
    }
  }
}

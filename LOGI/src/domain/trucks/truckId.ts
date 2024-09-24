import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface TruckIdProps {
  value: string;
}

export class TruckId extends ValueObject<TruckIdProps> {
  get value (): string {
    return this.props.value;
  }

  private constructor (props: TruckIdProps) {
    super(props);
  }

  public static create (truckId: string): Result<TruckId> {
    const guardResult = Guard.againstNullOrUndefined(truckId, 'truckId');
    const guardResult1 = Guard.isValidTruckId(truckId, 'truckId');
    if (!guardResult.succeeded) {
      return Result.fail<TruckId>(guardResult.message);
    } else if (!guardResult1.succeeded) {
      return Result.fail<TruckId>(guardResult1.message);
    } else {
      return Result.ok<TruckId>(new TruckId({value: truckId}))
    }
  }
}


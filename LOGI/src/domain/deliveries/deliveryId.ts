import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface DeliveryIdProps {
  value: string;
}

export class DeliveryId extends ValueObject<DeliveryIdProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props) {
    super(props)
  }

  public static create(deliveryId: string): Result<DeliveryId> {
    const guardResult = Guard.againstNullOrUndefined(deliveryId, 'deliveryId');
    const emptyResult = Guard.isEmpty(deliveryId, 'deliveryId');

    if (!guardResult.succeeded) {
      return Result.fail<DeliveryId>(guardResult.message);
    } else if (!emptyResult.succeeded) {
      return Result.fail<DeliveryId>(emptyResult.message);
    } else {
      return Result.ok<DeliveryId>(new DeliveryId({value: deliveryId}))
    }
  }
}

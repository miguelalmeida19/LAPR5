import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface ShipmentIdProps {
  value: string;
}

export class ShipmentId extends ValueObject<ShipmentIdProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: ShipmentIdProps) {
    super(props);
  }

  public static create(shipmentId: string): Result<ShipmentId> {
    const guardResult = Guard.againstNullOrUndefined(shipmentId, 'shipmentId');
    const _guardResult = Guard.isValidShipmentId(shipmentId, 'shipmentId');
    if (!guardResult.succeeded) {
      return Result.fail<ShipmentId>(guardResult.message);
    } else if (!_guardResult.succeeded) {
      return Result.fail<ShipmentId>(_guardResult.message);
    } else {
      return Result.ok<ShipmentId>(new ShipmentId({value: shipmentId}));
    }
  }
}

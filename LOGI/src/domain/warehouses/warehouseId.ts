import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface WarehouseIdProps {
  value: string;
}

export class WarehouseId extends ValueObject<WarehouseIdProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props) {
    super(props)
  }

  public static create(warehouseId: string): Result<WarehouseId> {
    const guardResult = Guard.againstNullOrUndefined(warehouseId, 'warehouseId');
    const emptyResult = Guard.isEmpty(warehouseId, 'warehouseId');

    if (!guardResult.succeeded) {
      return Result.fail<WarehouseId>(guardResult.message);
    } else if (!emptyResult.succeeded) {
      return Result.fail<WarehouseId>(emptyResult.message);
    } else {
      return Result.ok<WarehouseId>(new WarehouseId({value: warehouseId}))
    }
  }
}

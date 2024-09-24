import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface PackageIdProps {
  value: string;
}

export class PackageId extends ValueObject<PackageIdProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: PackageIdProps) {
    super(props);
  }

  public static create(packageId: string): Result<PackageId> {
    const guardResult = Guard.againstNullOrUndefined(packageId, 'packageId');
    const _guardResult = Guard.isValidPackageId(packageId, 'packageId');
    if (!guardResult.succeeded) {
      return Result.fail<PackageId>(guardResult.message);
    } else if (!_guardResult.succeeded) {
      return Result.fail<PackageId>(_guardResult.message);
    }else {
      return Result.ok<PackageId>(new PackageId({value: packageId}));
    }
  }

}

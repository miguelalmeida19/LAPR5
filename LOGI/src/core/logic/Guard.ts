
export interface IGuardResult {
  succeeded: boolean;
  message?: string;
}

export interface IGuardArgument {
  argument: any;
  argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {
  public static combine (guardResults: IGuardResult[]): IGuardResult {
    for (let result of guardResults) {
      if (result.succeeded === false) return result;
    }

    return { succeeded: true };
  }

  public static againstNullOrUndefined (argument: any, argumentName: string): IGuardResult {
    if (argument === null || argument === undefined) {
      return { succeeded: false, message: `${argumentName} is null or undefined` }
    } else {
      return { succeeded: true }
    }
  }

  public static againstNullOrUndefinedBulk(args: GuardArgumentCollection): IGuardResult {
    for (let arg of args) {
      const result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
      if (!result.succeeded) return result;
    }

    return { succeeded: true }
  }

  public static isPositive(argument: any, argumentName: string): IGuardResult {
    if (argument < 0) {

      let name = argumentName.charAt(0).toUpperCase() + argumentName.slice(1,argumentName.length)

      return { succeeded: false, message: `${name} is negative!` }
    } else {
      return { succeeded: true }
    }
  }

  public static isEmpty(argument: any, argumentName: string): IGuardResult {
    if (argument === "") {
      return { succeeded: false, message: `${argumentName} is empty` }
    } else {
      return { succeeded: true }
    }
  }

  public static isValidTruckId(argument: any, argumentName: string): IGuardResult {
    const re = new RegExp("^([A-Z]{2}-\\d{2}-[A-Z]{2}|\\d{2}-[A-Z]{2}-\\d{2}|\\d{2}-\\d{2}-[A-Z]{2}|[A-Z]{2}-\\d{2}-\\d{2})$");

    if (!re.test(String(argument))) {
      return { succeeded: false, message: `${argumentName} is negative` }
    } else {
      return { succeeded: true }
    }
  }

  public static isValidShipmentId(argument: any, argumentName: string): IGuardResult {
    const re = new RegExp("^S[0-9]{2}");

    if (!re.test(String(argument))) return { succeeded: false, message: `${argumentName} is negative` }
    else return { succeeded: true }
  }

  public static isValidPackageId(argument: any, argumentName: string): IGuardResult {
    const re = new RegExp("^P[0-9]{2}");

    if (!re.test(String(argument))) return { succeeded: false, message: `${argumentName} is negative` }
    else return { succeeded: true }
  }

  public static isOneOf (value: any, validValues: any[], argumentName: string) : IGuardResult {
    let isValid = false;
    for (let validValue of validValues) {
      if (value === validValue) {
        isValid = true;
      }
    }

    if (isValid) {
      return { succeeded: true }
    } else {
      return {
        succeeded: false,
        message: `${argumentName} isn't oneOf the correct types in ${JSON.stringify(validValues)}. Got "${value}".`
      }
    }
  }

  public static inRange (num: number, min: number, max: number, argumentName: string) : IGuardResult {
    const isInRange = num >= min && num <= max;
    if (!isInRange) {
      return { succeeded: false, message: `${argumentName} is not within range ${min} to ${max}.`}
    } else {
      return { succeeded: true }
    }
  }

  public static allInRange (numbers: number[], min: number, max: number, argumentName: string) : IGuardResult {
    let failingResult: IGuardResult = null;
    for(let num of numbers) {
      const numIsInRangeResult = this.inRange(num, min, max, argumentName);
      if (!numIsInRangeResult.succeeded) failingResult = numIsInRangeResult;
    }

    if (failingResult) {
      return { succeeded: false, message: `${argumentName} is not within the range.`}
    } else {
      return { succeeded: true }
    }
  }
}

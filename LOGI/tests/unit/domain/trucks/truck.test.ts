import ITruckDTO from "../../../../src/dto/ITruckDTO";
import {TruckId} from "../../../../src/domain/trucks/truckId";
import {Tare} from "../../../../src/domain/trucks/tare";
import {Capacity} from "../../../../src/domain/trucks/capacity";
import {BatteryCharge} from "../../../../src/domain/trucks/batteryCharge";
import {Autonomy} from "../../../../src/domain/trucks/autonomy";
import {RechargeBattery} from "../../../../src/domain/trucks/rechargeBattery";
import {Truck} from "../../../../src/domain/trucks/truck";


describe('Truck Unit Tests', () => {
  let truckId: string = "22-BB-12"
  let tare: number = 7500
  let capacity: number = 4300
  let batteryCharge: number = 80
  let autonomy: number = 100
  let rechargeBattery: number = 60
  let active= true
  let truckDto: ITruckDTO = {
    truckId: truckId,
    tare: tare,
    capacity: capacity,
    batteryCharge: batteryCharge,
    autonomy: autonomy,
    rechargeBattery: rechargeBattery,
    active: active
  }

  const resetTruckId=()=>truckDto.truckId=truckId;
  const resetTare = () => truckDto.tare = tare;
  const resetCapacity = () => truckDto.capacity = capacity;
  const resetBatteryCharge = () => truckDto.batteryCharge = batteryCharge;
  const resetAutonomy = () => truckDto.autonomy = autonomy;
  const resetRechargeBattery = () => truckDto.rechargeBattery = rechargeBattery;

  it('create valid truck', () => {
    const truck = Truck.create(truckDto);
    expect(truck.isSuccess).toEqual(true);
    expect(truck.getValue().truckId.value).toEqual(truckId);
    expect(truck.getValue().tare.value).toEqual(tare);
    expect(truck.getValue().capacity.value).toEqual(capacity);
    expect(truck.getValue().batteryCharge.value).toEqual(batteryCharge);
    expect(truck.getValue().autonomy.value).toEqual(autonomy);
    expect(truck.getValue().rechargeBattery.value).toEqual(rechargeBattery);
  })

  it('fail to create truck with empty truckId', () => {
    truckDto.truckId=""
    const dto = Truck.create(truckDto);
    expect(dto.isFailure).toEqual(true);
    resetTruckId()
  })

  it('fail to create truck with null truckId', () => {
    truckDto.truckId = null
    const dto = Truck.create(truckDto);
    expect(dto.isFailure).toEqual(true);
    resetTruckId()
  })

  it('fail to create truck with undefined truckId', () => {
    truckDto.truckId = undefined
    const dto = Truck.create(truckDto);
    expect(dto.isFailure).toEqual(true);
    resetTruckId()
  })

  it('fail to create truck with negative tare', () => {
    truckDto.tare=-3
    const dto = Truck.create(truckDto);
    expect(dto.isFailure).toEqual(true);
    resetTare()
  })

  it('fail to create truck with null tare', () => {
    truckDto.tare=null
    const dto = Truck.create(truckDto);
    expect(dto.isFailure).toEqual(true);
    resetTare()
  })

  it('fail to create truck with undefined tare', () => {
    truckDto.tare=undefined
    const dto = Truck.create(truckDto);
    expect(dto.isFailure).toEqual(true);
    resetTare()
  })

  it('fail to create truck with negative capacity', () => {
    truckDto.capacity=-6
    const dto = Truck.create(truckDto);
    expect(dto.isFailure).toEqual(true);
    resetCapacity()
  })

  it('fail to create truck with null capacity', () => {
    truckDto.capacity= null
    const dto = Truck.create(truckDto);
    expect(dto.isFailure).toEqual(true);
    resetCapacity()
  })

  it('fail to create truck with undefined capacity', () => {
    truckDto.capacity= undefined
    const dto = Truck.create(truckDto);
    expect(dto.isFailure).toEqual(true);
    resetCapacity()
  })

  it('fail to create truck with negative batteryCharge', () => {
    truckDto.batteryCharge=-6
    const dto = Truck.create(truckDto);
    expect(dto.isFailure).toEqual(true);
    resetBatteryCharge()
  })

  it('fail to create truck with null batteryCharge', () => {
    truckDto.batteryCharge= null
    const dto = Truck.create(truckDto);
    expect(dto.isFailure).toEqual(true);
    resetBatteryCharge()
  })

  it('fail to create truck with undefined batteryCharge', () => {
    truckDto.batteryCharge= undefined
    const dto = Truck.create(truckDto);
    expect(dto.isFailure).toEqual(true);
    resetBatteryCharge()
  })

  it('fail to create truck with negative autonomy', () => {
    truckDto.autonomy=-8
    const dto = Truck.create(truckDto);
    expect(dto.isFailure).toEqual(true);
    resetAutonomy()
  })

  it('fail to create truck with null autonomy', () => {
    truckDto.autonomy= null
    const dto = Truck.create(truckDto);
    expect(dto.isFailure).toEqual(true);
    resetAutonomy()
  })

  it('fail to create truck with undefined autonomy', () => {
    truckDto.autonomy= undefined
    const dto = Truck.create(truckDto);
    expect(dto.isFailure).toEqual(true);
    resetAutonomy()
  })

  it('fail to create truck with negative rechargeBattery', () => {
    truckDto.rechargeBattery=-10
    const dto = Truck.create(truckDto);
    expect(dto.isFailure).toEqual(true);
    resetRechargeBattery()
  })

  it('fail to create truck with null rechargeBattery', () => {
    truckDto.rechargeBattery= null
    const dto = Truck.create(truckDto);
    expect(dto.isFailure).toEqual(true);
    resetRechargeBattery()
  })

  it('fail to create truck with undefined rechargeBattery', () => {
    truckDto.rechargeBattery= undefined
    const dto = Truck.create(truckDto);
    expect(dto.isFailure).toEqual(true);
    resetRechargeBattery()
  })

});

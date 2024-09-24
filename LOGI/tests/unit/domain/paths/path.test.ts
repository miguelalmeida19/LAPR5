import {Path} from "../../../../src/domain/paths/path";
import IPathDTO from "../../../../src/dto/IPathDTO";

describe('Path Unit Tests', () => {
  let departureWarehouse: string = "123a"
  let arrivalWarehouse: string = "b123"
  let distance: number = 7500
  let duration: number = 23
  let consumedEnergy: number = 90
  let pathDto: IPathDTO = {
    id:"",
    departureWarehouse: departureWarehouse,
    arrivalWarehouse: arrivalWarehouse,
    distance: distance,
    duration: duration,
    consumedEnergy: consumedEnergy
  }

  const resetDepartureWarehouse=()=>pathDto.departureWarehouse=departureWarehouse;
  const resetArrivalWarehouse=()=>pathDto.arrivalWarehouse=arrivalWarehouse;
  const resetDistance=()=>pathDto.distance=distance;
  const resetDuration=()=>pathDto.duration=duration;
  const resetConsumedEnergy=()=>pathDto.consumedEnergy=consumedEnergy;

  it('create valid path', () => {
    const path = Path.create(pathDto);
    expect(path.isSuccess).toEqual(true);
    expect(path.getValue().departureWarehouse.value).toEqual(departureWarehouse);
    expect(path.getValue().arrivalWarehouse.value).toEqual(arrivalWarehouse);
    expect(path.getValue().distance.value).toEqual(distance);
    expect(path.getValue().duration.value).toEqual(duration);
    expect(path.getValue().consumedEnergy.value).toEqual(consumedEnergy);
  })

  it('fail to create path with empty departure warehouse', () => {
    pathDto.departureWarehouse=""
    const dto = Path.create(pathDto);
    expect(dto.isFailure).toEqual(true);
    resetDepartureWarehouse()
  })

  it('fail to create path with null departure warehouse', () => {
    pathDto.departureWarehouse=null
    const dto = Path.create(pathDto);
    expect(dto.isFailure).toEqual(true);
    resetDepartureWarehouse()
  })

  it('fail to create path with undefined departure warehouse', () => {
    pathDto.departureWarehouse=undefined
    const dto = Path.create(pathDto);
    expect(dto.isFailure).toEqual(true);
    resetDepartureWarehouse()
  })

  it('fail to create path with empty arrival warehouse', () => {
    pathDto.arrivalWarehouse=""
    const dto = Path.create(pathDto);
    expect(dto.isFailure).toEqual(true);
    resetArrivalWarehouse()
  })

  it('fail to create path with null arrival warehouse', () => {
    pathDto.arrivalWarehouse=null
    const dto = Path.create(pathDto);
    expect(dto.isFailure).toEqual(true);
    resetArrivalWarehouse()
  })

  it('fail to create path with undefined arrival warehouse', () => {
    pathDto.arrivalWarehouse=undefined
    const dto = Path.create(pathDto);
    expect(dto.isFailure).toEqual(true);
    resetArrivalWarehouse()
  })

  it('fail to create path with negative distance', () => {
    pathDto.distance=-3
    const dto = Path.create(pathDto);
    expect(dto.isFailure).toEqual(true);
    resetDistance()
  })

  it('fail to create path with null tare', () => {
    pathDto.distance=null
    const dto = Path.create(pathDto);
    expect(dto.isFailure).toEqual(true);
    resetDistance()
  })

  it('fail to create path with undefined tare', () => {
    pathDto.distance=undefined
    const dto = Path.create(pathDto);
    expect(dto.isFailure).toEqual(true);
    resetDistance()
  })

  it('fail to create path with negative duration', () => {
    pathDto.duration=-6
    const dto = Path.create(pathDto);
    expect(dto.isFailure).toEqual(true);
    resetDuration()
  })

  it('fail to create path with null duration', () => {
    pathDto.duration=null
    const dto = Path.create(pathDto);
    expect(dto.isFailure).toEqual(true);
    resetDuration()
  })

  it('fail to create path with undefined duration', () => {
    pathDto.duration=undefined
    const dto = Path.create(pathDto);
    expect(dto.isFailure).toEqual(true);
    resetDuration()
  })

  it('fail to create path with negative consumed energy', () => {
    pathDto.consumedEnergy=-8
    const dto = Path.create(pathDto);
    expect(dto.isFailure).toEqual(true);
    resetConsumedEnergy()
  })

  it('fail to create path with null consumed energy', () => {
    pathDto.consumedEnergy=null
    const dto = Path.create(pathDto);
    expect(dto.isFailure).toEqual(true);
    resetConsumedEnergy()
  })

  it('fail to create path with undefined consumed energy', () => {
    pathDto.consumedEnergy=undefined
    const dto = Path.create(pathDto);
    expect(dto.isFailure).toEqual(true);
    resetConsumedEnergy()
  })

});

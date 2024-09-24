import {Shipment} from "../../../../src/domain/shipments/shipment";
import IShipmentDTO from "../../../../src/dto/IShipmentDTO";

describe('Shipment Unit Tests', () => {

  let _shipmentId: string = "S01";
  let _truckId: string = "16-86-DR";
  let _toBeDeliveredDay: number = 13;
  let _toBeDeliveredMonth: number = 7;
  let _toBeDeliveredYear: number = 2023;
  let _shipmentDTO: IShipmentDTO = {
    shipmentId: _shipmentId,
    truckId: _truckId,
    toBeDeliveredDay: _toBeDeliveredDay,
    toBeDeliveredMonth: _toBeDeliveredMonth,
    toBeDeliveredYear: _toBeDeliveredYear
  }

  const resetShipmentId = () => _shipmentDTO.shipmentId = _shipmentId;
  const resetTruckId = () => _shipmentDTO.truckId = _truckId;
  const resetToBeDeliveredDay = () => _shipmentDTO.toBeDeliveredDay = _toBeDeliveredDay;
  const resetToBeDeliveredMonth = () => _shipmentDTO.toBeDeliveredMonth = _toBeDeliveredMonth;
  const resetToBeDeliveredYear = () => _shipmentDTO.toBeDeliveredYear = _toBeDeliveredYear;

  it('success - create valid shipment', () => {
    const _shipment = Shipment.create(_shipmentDTO);
    expect(_shipment.isSuccess).toEqual(true);
    expect(_shipment.getValue().shipmentId.value).toEqual(_shipmentId);
    expect(_shipment.getValue().truckId.value).toEqual(_truckId);
    expect(_shipment.getValue().toBeDeliveredDay).toEqual(_toBeDeliveredDay);
    expect(_shipment.getValue().toBeDeliveredMonth).toEqual(_toBeDeliveredMonth);
    expect(_shipment.getValue().toBeDeliveredYear).toEqual(_toBeDeliveredYear);
  })

  it('fail - shipmentId empty', () => {
    _shipmentDTO.shipmentId = "";
    const dto = Shipment.create(_shipmentDTO);
    expect(dto.isFailure).toEqual(true);
    resetShipmentId();
  })

  it('fail - shipmentId null', () => {
    _shipmentDTO.shipmentId = null;
    const dto = Shipment.create(_shipmentDTO);
    expect(dto.isFailure).toEqual(true);
    resetShipmentId();
  })

  it('fail - shipmentId undefined', () => {
    _shipmentDTO.shipmentId = undefined;
    const dto = Shipment.create(_shipmentDTO);
    expect(dto.isFailure).toEqual(true);
    resetShipmentId();
  })

  it('fail - truckId empty', () => {
    _shipmentDTO.truckId = "";
    const dto = Shipment.create(_shipmentDTO);
    expect(dto.isFailure).toEqual(true);
    resetTruckId();
  })

  it('fail - truckId null', () => {
    _shipmentDTO.truckId = null;
    const dto = Shipment.create(_shipmentDTO);
    expect(dto.isFailure).toEqual(true);
    resetTruckId();
  })

  it('fail - truckId undefined', () => {
    _shipmentDTO.truckId = undefined;
    const dto = Shipment.create(_shipmentDTO);
    expect(dto.isFailure).toEqual(true);
    resetTruckId();
  })

  it('fail - toBeDeliveredDay null', () => {
    _shipmentDTO.toBeDeliveredDay = null;
    const dto = Shipment.create(_shipmentDTO);
    expect(dto.isFailure).toEqual(true);
    resetToBeDeliveredDay();
  })

  it('fail - toBeDeliveredDay undefined', () => {
    _shipmentDTO.toBeDeliveredDay = undefined;
    const dto = Shipment.create(_shipmentDTO);
    expect(dto.isFailure).toEqual(true);
    resetToBeDeliveredDay();
  })

  it('fail - toBeDeliveredDay under valued', () => {
    _shipmentDTO.toBeDeliveredDay = 0;
    const dto = Shipment.create(_shipmentDTO);
    expect(dto.isFailure).toEqual(true);
    resetToBeDeliveredDay();
  })

  it('fail - toBeDeliveredDay over valued', () => {
    _shipmentDTO.toBeDeliveredDay = 32;
    const dto = Shipment.create(_shipmentDTO);
    expect(dto.isFailure).toEqual(true);
    resetToBeDeliveredDay();
  })

  it('fail - toBeDeliveredMonth null', () => {
    _shipmentDTO.toBeDeliveredMonth = null;
    const dto = Shipment.create(_shipmentDTO);
    expect(dto.isFailure).toEqual(true);
    resetToBeDeliveredMonth();
  })

  it('fail - toBeDeliveredMonth undefined', () => {
    _shipmentDTO.toBeDeliveredMonth = undefined;
    const dto = Shipment.create(_shipmentDTO);
    expect(dto.isFailure).toEqual(true);
    resetToBeDeliveredMonth();
  })

  it('fail - toBeDeliveredMonth under valued', () => {
    _shipmentDTO.toBeDeliveredMonth = 0;
    const dto = Shipment.create(_shipmentDTO);
    expect(dto.isFailure).toEqual(true);
    resetToBeDeliveredMonth();
  })

  it('fail - toBeDeliveredMonth over valued', () => {
    _shipmentDTO.toBeDeliveredMonth = 13;
    const dto = Shipment.create(_shipmentDTO);
    expect(dto.isFailure).toEqual(true);
    resetToBeDeliveredMonth();
  })

  it('fail - toBeDeliveredYear null', () => {
    _shipmentDTO.toBeDeliveredYear = null;
    const dto = Shipment.create(_shipmentDTO);
    expect(dto.isFailure).toEqual(true);
    resetToBeDeliveredYear();
  })

  it('fail - toBeDeliveredYear undefined', () => {
    _shipmentDTO.toBeDeliveredYear = undefined;
    const dto = Shipment.create(_shipmentDTO);
    expect(dto.isFailure).toEqual(true);
    resetToBeDeliveredYear();
  })

  it('fail - toBeDeliveredMonth under valued', () => {
    _shipmentDTO.toBeDeliveredYear = 0;
    const dto = Shipment.create(_shipmentDTO);
    expect(dto.isFailure).toEqual(true);
    resetToBeDeliveredYear();
  })

  it('fail - toBeDeliveredMonth over valued', () => {
    _shipmentDTO.toBeDeliveredYear = 13;
    const dto = Shipment.create(_shipmentDTO);
    expect(dto.isFailure).toEqual(true);
    resetToBeDeliveredYear();
  })

})

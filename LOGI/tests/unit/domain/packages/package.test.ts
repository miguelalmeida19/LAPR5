import {Package} from "../../../../src/domain/packages/package";
import IPackageDTO from "../../../../src/dto/IPackageDTO";

describe('Package Unit Tests', () => {

  let _packageId: string = "P01";
  let _xCoordinate: number = 10;
  let _yCoordinate: number = 11;
  let _zCoordinate: number = 12;
  let _shipmentId: string = "S01";
  let _deliveryId: string = "D01";
  let _pathId: string = "d7fcb590-b55d-4e3c-9a15-cb3da619eda3";

  let _packageDTO: IPackageDTO = {
    packageId: _packageId,
    xCoordinate: _xCoordinate,
    yCoordinate: _yCoordinate,
    zCoordinate: _zCoordinate,
    shipmentId: _shipmentId,
    deliveryId: _deliveryId,
    pathId: _pathId
  }

  const resetPackageId = () => _packageDTO.packageId = _packageId;
  const resetXCoordinate = () => _packageDTO.xCoordinate = _xCoordinate;
  const resetYCoordinate = () => _packageDTO.yCoordinate = _yCoordinate;
  const resetZCoordinate = () => _packageDTO.zCoordinate = _zCoordinate;
  const resetShipmentId = () => _packageDTO.shipmentId = _shipmentId;
  const resetDeliveryId = () => _packageDTO.deliveryId = _deliveryId;
  const resetPathId = () => _packageDTO.pathId = _pathId;

  it('success - create valid package', () => {
    const _package = Package.create(_packageDTO);
    expect(_package.isSuccess).toEqual(true);
    expect(_package.getValue().packageId.value).toEqual(_packageId);
    expect(_package.getValue().xCoordinate).toEqual(_xCoordinate);
    expect(_package.getValue().yCoordinate).toEqual(_yCoordinate);
    expect(_package.getValue().zCoordinate).toEqual(_zCoordinate);
    expect(_package.getValue().shipmentId.value).toEqual(_shipmentId);
    expect(_package.getValue().deliveryId.value).toEqual(_deliveryId);
    expect(_package.getValue().pathId.toValue()).toEqual(_pathId);
  })

  it('fail - packageId empty', () => {
    _packageDTO.packageId = "";
    const dto = Package.create(_packageDTO);
    expect(dto.isFailure).toEqual(true);
    resetPackageId();
  })

  it('fail - packageId null', () => {
    _packageDTO.packageId = null;
    const dto = Package.create(_packageDTO);
    expect(dto.isFailure).toEqual(true);
    resetPackageId();
  })

  it('fail - packageId undefined', () => {
    _packageDTO.packageId = undefined;
    const dto = Package.create(_packageDTO);
    expect(dto.isFailure).toEqual(true);
    resetPackageId();
  })

  it('fail - xCoordinate null', () => {
    _packageDTO.xCoordinate = null;
    const dto = Package.create(_packageDTO);
    expect(dto.isFailure).toEqual(true);
    resetXCoordinate();
  })

  it('fail - xCoordinate undefined', () => {
    _packageDTO.xCoordinate = undefined;
    const dto = Package.create(_packageDTO);
    expect(dto.isFailure).toEqual(true);
    resetXCoordinate();
  })

  it('fail - xCoordinate under valued', () => {
    _packageDTO.xCoordinate = 0;
    const dto = Package.create(_packageDTO);
    expect(dto.isFailure).toEqual(true);
    resetXCoordinate();
  })

  it('fail - xCoordinate over valued', () => {
    _packageDTO.xCoordinate = 1001;
    const dto = Package.create(_packageDTO);
    expect(dto.isFailure).toEqual(true);
    resetXCoordinate();
  })

  it('fail - yCoordinate null', () => {
    _packageDTO.yCoordinate = null;
    const dto = Package.create(_packageDTO);
    expect(dto.isFailure).toEqual(true);
    resetYCoordinate();
  })

  it('fail - yCoordinate undefined', () => {
    _packageDTO.yCoordinate = undefined;
    const dto = Package.create(_packageDTO);
    expect(dto.isFailure).toEqual(true);
    resetYCoordinate();
  })

  it('fail - yCoordinate under valued', () => {
    _packageDTO.yCoordinate = 0;
    const dto = Package.create(_packageDTO);
    expect(dto.isFailure).toEqual(true);
    resetYCoordinate();
  })

  it('fail - yCoordinate over valued', () => {
    _packageDTO.yCoordinate = 1001;
    const dto = Package.create(_packageDTO);
    expect(dto.isFailure).toEqual(true);
    resetYCoordinate();
  })

  it('fail - zCoordinate null', () => {
    _packageDTO.zCoordinate = null;
    const dto = Package.create(_packageDTO);
    expect(dto.isFailure).toEqual(true);
    resetZCoordinate();
  })

  it('fail - zCoordinate undefined', () => {
    _packageDTO.zCoordinate = undefined;
    const dto = Package.create(_packageDTO);
    expect(dto.isFailure).toEqual(true);
    resetZCoordinate();
  })

  it('fail - zCoordinate under valued', () => {
    _packageDTO.zCoordinate = 0;
    const dto = Package.create(_packageDTO);
    expect(dto.isFailure).toEqual(true);
    resetZCoordinate();
  })

  it('fail - zCoordinate over valued', () => {
    _packageDTO.zCoordinate = 1001;
    const dto = Package.create(_packageDTO);
    expect(dto.isFailure).toEqual(true);
    resetZCoordinate();
  })

  it('fail - shipmentId empty', () => {
    _packageDTO.shipmentId = "";
    const dto = Package.create(_packageDTO);
    expect(dto.isFailure).toEqual(true);
    resetShipmentId();
  })

  it('fail - shipmentId null', () => {
    _packageDTO.shipmentId = null;
    const dto = Package.create(_packageDTO);
    expect(dto.isFailure).toEqual(true);
    resetShipmentId();
  })

  it('fail - shipmentId undefined', () => {
    _packageDTO.shipmentId = undefined;
    const dto = Package.create(_packageDTO);
    expect(dto.isFailure).toEqual(true);
    resetShipmentId();
  })

  it('fail - deliveryId empty', () => {
    _packageDTO.deliveryId = "";
    const dto = Package.create(_packageDTO);
    expect(dto.isFailure).toEqual(true);
    resetDeliveryId();
  })

  it('fail - deliveryId null', () => {
    _packageDTO.deliveryId = null;
    const dto = Package.create(_packageDTO);
    expect(dto.isFailure).toEqual(true);
    resetDeliveryId();
  })

  it('fail - deliveryId undefined', () => {
    _packageDTO.deliveryId = undefined;
    const dto = Package.create(_packageDTO);
    expect(dto.isFailure).toEqual(true);
    resetDeliveryId();
  })

})

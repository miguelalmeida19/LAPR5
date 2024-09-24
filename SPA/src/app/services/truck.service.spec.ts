import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {Truck} from "../domain/truck";
import {TruckService} from "./truck.service";
import {TestBed} from "@angular/core/testing";

describe('TruckService', () => {
  let httpTestingController: HttpTestingController;
  let service: TruckService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TruckService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(TruckService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should get trucks', () => {
    const fakeResponse = [
      { truckId: '1', tare: 0, capacity: 0, batteryCharge: 0, autonomy: 0, rechargeBattery: 0, active: true },
      { truckId: '2', tare: 0, capacity: 0, batteryCharge: 0, autonomy: 0, rechargeBattery: 0, active: false },
      { truckId: '3', tare: 0, capacity: 0, batteryCharge: 0, autonomy: 0, rechargeBattery: 0, active: true }
    ];

    service.getTrucks().subscribe((response: Truck[]) => {
      expect(response).toEqual(fakeResponse);
    });

    const req = httpTestingController.expectOne(`${service.trucksUrl}`);
    expect(req.request.method).toEqual('GET');
    req.flush(fakeResponse);
  });

  it('should get truck by id', () => {
    const fakeResponse = { truckId: '1', tare: 0, capacity: 0, batteryCharge: 0, autonomy: 0, rechargeBattery: 0, active: true };

    service.getTruck('1').subscribe(response => {
      expect(response).toEqual(fakeResponse);
    });

    const req = httpTestingController.expectOne(`${service.trucksUrl}/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(fakeResponse);
  });

  it('should search for truck by term', () => {
    const fakeResponse = [
      { truckId: '1', tare: 0, capacity: 0, batteryCharge: 0, autonomy: 0, rechargeBattery: 0, active: true },
      { truckId: '2', tare: 0, capacity: 0, batteryCharge: 0, autonomy: 0, rechargeBattery: 0, active: false },
      { truckId: '3', tare: 0, capacity: 0, batteryCharge: 0, autonomy: 0, rechargeBattery: 0, active: true }
    ];

    service.searchTruck('1').subscribe(response => {
      expect(response).toEqual(fakeResponse);
    });

    const req = httpTestingController.expectOne(`${service.trucksUrl}/?truckId=1`);
    expect(req.request.method).toEqual('GET');
    req.flush(fakeResponse);
  });

  it('should add a new truck', () => {
    const fakeResponse = { truckId: '4', tare: 0, capacity: 0, batteryCharge: 0, autonomy: 0, rechargeBattery: 0, active: true };
    const fakeTruck = { truckId: '4', tare: 0, capacity: 0, batteryCharge: 0, autonomy: 0, rechargeBattery: 0, active: true };

    service.addTruck(fakeTruck).subscribe(response => {
      expect(response).toEqual(fakeResponse);
    });

    const req = httpTestingController.expectOne(`${service.trucksUrl}`);
    expect(req.request.method).toEqual('POST');
    req.flush(fakeResponse);
  });

  it('should change the status of a truck', () => {
    const fakeTruck = { truckId: '4', tare: 0, capacity: 0, batteryCharge: 0, autonomy: 0, rechargeBattery: 0, active: true };

    service.changeActivate(fakeTruck);
    let req = httpTestingController.expectOne(`${service.trucksUrl}/deactivate`);
    expect(req.request.method).toEqual('PATCH');
    req.flush({});

    fakeTruck.active = false;
    service.changeActivate(fakeTruck);
    req = httpTestingController.expectOne(`${service.trucksUrl}/activate`);
    expect(req.request.method).toEqual('PATCH');
    req.flush({});
  });

  it('should update a truck', () => {
    const fakeResponse = {};
    const fakeTruck = { truckId: '4', tare: 0, capacity: 0, batteryCharge: 0, autonomy: 0, rechargeBattery: 0, active: true };

    service.updateTruck(fakeTruck).subscribe(response => {
      expect(response).toEqual(fakeResponse);
    });

    const req = httpTestingController.expectOne(`${service.trucksUrl}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(fakeResponse);
  });

});

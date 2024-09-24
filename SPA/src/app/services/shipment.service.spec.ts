import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {TestBed} from "@angular/core/testing";

import {Shipment} from "../domain/shipment";
import {ShipmentService} from "./shipment.service";

describe('ShipmentService', () => {
  let httpTestingController: HttpTestingController;
  let service: ShipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShipmentService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ShipmentService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all shipments', () => {
    const shipments = [
      { shipmentId: 'S01', truckId: 'BB-21-AA', toBeDeliveredDay: 11, toBeDeliveredMonth: 6, toBeDeliveredYear: 2023 },
      { shipmentId: 'S02', truckId: 'BB-22-AA', toBeDeliveredDay: 12, toBeDeliveredMonth: 7, toBeDeliveredYear: 2024 },
      { shipmentId: 'S03', truckId: 'BB-23-AA', toBeDeliveredDay: 13, toBeDeliveredMonth: 7, toBeDeliveredYear: 2025 }
    ];

    service.getShipments().subscribe((response: Shipment[]) => {
      expect(response).toEqual(shipments);
    });

    const req = httpTestingController.expectOne(`${service.shipmentsUrl}`);
    expect(req.request.method).toEqual('GET');
    req.flush(shipments);
  });

  it('should get a shipment by id', () => {
    const shipment = { shipmentId: 'S01', truckId: 'BB-21-AA', toBeDeliveredDay: 11, toBeDeliveredMonth: 6, toBeDeliveredYear: 2023 };
    service.getShipment('S01').subscribe(result => {
      expect(result).toEqual(shipment);
    });

    const req = httpTestingController.expectOne(`${service.shipmentsUrl}/S01`);
    expect(req.request.method).toEqual('GET');
    req.flush(shipment);
  });

  it('should search for shipments by term', () => {
    const shipments = [{ shipmentId: 'S01', truckId: 'BB-21-AA', toBeDeliveredDay: 11, toBeDeliveredMonth: 6, toBeDeliveredYear: 2023 }];
    service.searchShipment('S01').subscribe(result => {
      expect(result).toEqual(shipments);
    });

    const req = httpTestingController.expectOne(`${service.shipmentsUrl}/id/S01`);
    expect(req.request.method).toEqual('GET');
    req.flush(shipments);
  });

  it('should paginate shipments', () => {
    const shipments = [{ shipmentId: 'S01', truckId: 'BB-21-AA', toBeDeliveredDay: 11, toBeDeliveredMonth: 6, toBeDeliveredYear: 2023 }];
    service.paginateShipments(10, 1).subscribe(result => {
      expect(result).toEqual(shipments);
    });

    const req = httpTestingController.expectOne(`${service.shipmentsUrl}/n/10/p/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(shipments);
  });

})

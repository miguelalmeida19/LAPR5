import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {WarehouseService} from './warehouse.service';
import {Warehouse} from '../domain/warehouse';
import {HttpHeaders} from "@angular/common/http";

describe('WarehouseService', () => {
  let service: WarehouseService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WarehouseService]
    });

    service = TestBed.inject(WarehouseService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all warehouses', () => {
    const fakeWarehouses: Warehouse[] = [
      {
        id: '1',
        designation: 'Warehouse 1',
        street: 'Street 1',
        postalCode: '12345',
        location: 'Location 1',
        latitude: 0,
        longitude: 0,
        active: true
      },
      {
        id: '2',
        designation: 'Warehouse 2',
        street: 'Street 2',
        postalCode: '54321',
        location: 'Location 2',
        latitude: 1,
        longitude: 1,
        active: false
      }
    ];

    service.getWarehouses().subscribe(warehouses => {
      expect(warehouses).toEqual(fakeWarehouses);
    });

    const req = httpTestingController.expectOne(service.warehouseUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(fakeWarehouses);
  });

  it('should get a Warehouse by id', () => {
    const fakeWarehouse: Warehouse = {
      id: '123',
      designation: 'Designation',
      street: 'Street',
      postalCode: 'Postal code',
      location: 'Location',
      latitude: 0,
      longitude: 0,
      active: true
    };

    service.getWarehouse('123').subscribe(warehouse => {
      expect(warehouse).toEqual(fakeWarehouse);
    });

    const req = httpTestingController.expectOne(`${service.warehouseUrl}/123`);
    expect(req.request.method).toEqual('GET');
    req.flush(fakeWarehouse);
  });

  it('should search for warehouses', () => {
    const searchTerm = '123';
    const fakeWarehouses: Warehouse[] = [
      {
        id: '123',
        designation: 'Warehouse 1',
        street: 'Street 1',
        postalCode: '12345',
        location: 'City 1',
        latitude: 1,
        longitude: 1,
        active: true
      },
      {
        id: '456',
        designation: 'Warehouse 2',
        street: 'Street 2',
        postalCode: '23456',
        location: 'City 2',
        latitude: 2,
        longitude: 2,
        active: true
      }
    ];

    service.searchWarehouse(searchTerm).subscribe(warehouses => {
      expect(warehouses).toEqual(fakeWarehouses);
    });

    const req = httpTestingController.expectOne(`${service.warehouseUrl}/id/${searchTerm}`);
    expect(req.request.method).toEqual('GET');
    req.flush(fakeWarehouses);
  });

  it('should add a warehouse', () => {
    const fakeWarehouse: Warehouse = {
      id: '1',
      designation: 'Designation',
      street: 'Street',
      postalCode: 'Postal code',
      location: 'Location',
      latitude: 1,
      longitude: 1,
      active: true
    };

    service.addWarehouse(fakeWarehouse).subscribe(warehouse => {
      expect(warehouse).toEqual(fakeWarehouse);
    });

    const req = httpTestingController.expectOne(service.warehouseUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(fakeWarehouse);
  });

  it('should deactivate a warehouse if it is active', () => {
    const fakeWarehouse: Warehouse = {
      id: '1',
      designation: 'Warehouse 1',
      street: '123 Main St',
      postalCode: '12345',
      location: 'New York',
      latitude: 40.7128,
      longitude: 74.0060,
      active: true
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = '1';

    service.changeActivate(fakeWarehouse);

    const req = httpTestingController.expectOne(`${service.warehouseUrl}/deactivate`);
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual(body);
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');
  });

  it('should activate a warehouse if it is inactive', () => {
    const fakeWarehouse: Warehouse = {
      id: '1',
      designation: 'Warehouse 1',
      street: '123 Main St',
      postalCode: '12345',
      location: 'New York',
      latitude: 40.7128,
      longitude: 74.0060,
      active: false
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = '1';

    service.changeActivate(fakeWarehouse);

    const req = httpTestingController.expectOne(`${service.warehouseUrl}/activate`);
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual(body);
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');
  });

  it('should update a warehouse', () => {
    const fakeWarehouse: Warehouse = {
      id: '1',
      designation: 'Designation',
      street: 'Street',
      postalCode: '12345',
      location: 'Location',
      latitude: 123,
      longitude: 456,
      active: true
    };

    service.updateWarehouse(fakeWarehouse).subscribe(warehouse => {
      expect(warehouse).toEqual(fakeWarehouse);
    });

    const req = httpTestingController.expectOne(service.warehouseUrl + '/' + fakeWarehouse.id);
    expect(req.request.method).toEqual('PUT');
    req.flush(fakeWarehouse);
  });

});

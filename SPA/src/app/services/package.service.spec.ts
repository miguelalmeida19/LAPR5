import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {TestBed} from "@angular/core/testing";

import {Package} from "../domain/package";
import {PackageService} from "./package.service";

describe('PackageService', () => {
  let httpTestingController: HttpTestingController;
  let service: PackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PackageService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(PackageService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all packages', () => {
    const packages = [
      { packageId: 'P01', xCoordinate: 11, yCoordinate: 12, zCoordinate: 13, shipmentId: 'S01', deliveryId: 'D01', pathId: 'test1' },
      { packageId: 'P02', xCoordinate: 12, yCoordinate: 13, zCoordinate: 14, shipmentId: 'S02', deliveryId: 'D02', pathId: 'test2' }
    ];

    service.getPackages().subscribe((response: Package[]) => {
      expect(response).toEqual(packages);
    });

    const req = httpTestingController.expectOne(`${service.packagesUrl}`);
    expect(req.request.method).toEqual('GET');
    req.flush(packages);
  });

  it('should get a package by id', () => {
    const _package = { packageId: 'P01', xCoordinate: 11, yCoordinate: 12, zCoordinate: 13, shipmentId: 'S01', deliveryId: 'D01', pathId: 'test1' };
    service.getPackage('P01').subscribe(result => {
      expect(result).toEqual(_package);
    });

    const req = httpTestingController.expectOne(`${service.packagesUrl}/P01`);
    expect(req.request.method).toEqual('GET');
    req.flush(_package);
  });

  it('should search for packages by term', () => {
    const _packages = [{ packageId: 'P01', xCoordinate: 11, yCoordinate: 12, zCoordinate: 13, shipmentId: 'S01', deliveryId: 'D01', pathId: 'test1' }];
    service.searchPackage('P01').subscribe(result => {
      expect(result).toEqual(_packages);
    });

    const req = httpTestingController.expectOne(`${service.packagesUrl}/id/P01`);
    expect(req.request.method).toEqual('GET');
    req.flush(_packages);
  });

  it('should paginate packages', () => {
    const _packages = [{ packageId: 'P01', xCoordinate: 11, yCoordinate: 12, zCoordinate: 13, shipmentId: 'S01', deliveryId: 'D01', pathId: 'test1' }];
    service.paginatePackages(10, 1).subscribe(result => {
      expect(result).toEqual(_packages);
    });

    const req = httpTestingController.expectOne(`${service.packagesUrl}/n/10/p/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(_packages);
  });

})

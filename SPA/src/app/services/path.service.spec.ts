import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PathService } from './path.service';

describe('PathService', () => {
  let service: PathService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PathService]
    });

    service = TestBed.get(PathService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all paths', () => {
    const paths = [
      {
        id: '1',
        name: 'Test Path 1',
        departureWarehouse: 'Warehouse 1',
        arrivalWarehouse: 'Warehouse 2',
        distance: 100,
        duration: 10,
        consumedEnergy: 5
      },
      {
        id: '2',
        name: 'Test Path 2',
        departureWarehouse: 'Warehouse 2',
        arrivalWarehouse: 'Warehouse 3',
        distance: 200,
        duration: 20,
        consumedEnergy: 10
      }
    ];
    service.getPaths().subscribe(result => {
      expect(result).toEqual(paths);
    });

    const req = httpTestingController.expectOne(service.pathsUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(paths);
  });

  it('should get a path by id', () => {
    const path = {
      id: '1',
      name: 'Test Path 1',
      departureWarehouse: 'Warehouse 1',
      arrivalWarehouse: 'Warehouse 2',
      distance: 100,
      duration: 10,
      consumedEnergy: 5
    };
    service.getPath('1').subscribe(result => {
      expect(result).toEqual(path);
    });

    const req = httpTestingController.expectOne(`${service.pathsUrl}/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(path);
  });

  it('should search for paths by name', () => {
    const paths = [{
      id: '1',
      name: 'Test Path 1',
      departureWarehouse: 'Warehouse 1',
      arrivalWarehouse: 'Warehouse 2',
      distance: 100,
      duration: 10,
      consumedEnergy: 5
    }];
    service.searchPath('Test').subscribe(result => {
      expect(result).toEqual(paths);
    });

    const req = httpTestingController.expectOne(`${service.pathsUrl}/id/Test`);
    expect(req.request.method).toEqual('GET');
    req.flush(paths);
  });

  it('should search for paths by departure warehouse', () => {
    const paths = [{
      id: '1',
      name: 'Test Path 1',
      departureWarehouse: 'Warehouse 1',
      arrivalWarehouse: 'Warehouse 2',
      distance: 100,
      duration: 10,
      consumedEnergy: 5
    }];
    service.searchDepartureWarehouse('Warehouse 1').subscribe(result => {
      expect(result).toEqual(paths);
    });

    const req = httpTestingController.expectOne(`${service.pathsUrl}/departureWarehouse/Warehouse 1`);
    expect(req.request.method).toEqual('GET');
    req.flush(paths);
  });

  it('should search for paths by departure and arrival warehouses', () => {
    const paths = [{
      id: '1',
      name: 'Test Path 1',
      departureWarehouse: 'Warehouse 1',
      arrivalWarehouse: 'Warehouse 2',
      distance: 100,
      duration: 10,
      consumedEnergy: 5
    }];
    service.searchDepartureArrivalWarehouse('Warehouse 1', 'Warehouse 2').subscribe(result => {
      expect(result).toEqual(paths);
    });

    const req = httpTestingController.expectOne(`${service.pathsUrl}/departureWarehouse/Warehouse 1/arrivalWarehouse/Warehouse 2`);
    expect(req.request.method).toEqual('GET');
    req.flush(paths);
  });

  it('should search for paths by arrival warehouse', () => {
    const paths = [{
      id: '1',
      name: 'Test Path 1',
      departureWarehouse: 'Warehouse 1',
      arrivalWarehouse: 'Warehouse 2',
      distance: 100,
      duration: 10,
      consumedEnergy: 5
    }];
    service.searchArrivalWarehouse('Warehouse 2').subscribe(result => {
      expect(result).toEqual(paths);
    });

    const req = httpTestingController.expectOne(`${service.pathsUrl}/arrivalWarehouse/Warehouse 2`);
    expect(req.request.method).toEqual('GET');
    req.flush(paths);
  });

  it('should paginate paths', () => {
    const paths = [{id: '1', name: 'Test Path 1'}];
    service.paginatePaths(10, 1).subscribe(result => {
      expect(result).toEqual(paths);
    });

    const req = httpTestingController.expectOne(`${service.pathsUrl}/n/10/p/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(paths);
  });
});

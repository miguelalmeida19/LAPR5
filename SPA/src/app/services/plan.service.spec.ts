import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {PlanService} from "./plan.service";
import {TestBed} from "@angular/core/testing";

describe('PlanService', () => {
  let httpTestingController: HttpTestingController;
  let service: PlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlanService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(PlanService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should get plan', () => {
    const fakeResponse = {
      lchargements: [1, 2, 3, 4, 5],
      ld: [6, 7, 8, 9, 10],
      time: 42
    };

    service.getPlan().subscribe(response => {
      expect(response).toEqual(fakeResponse);
    });

    const req = httpTestingController.expectOne(`${service.plansUrl}`);
    expect(req.request.method).toEqual('GET');
    req.flush(fakeResponse);
  });

  it('should get simulated fleet plan', () => {
    const fakeResponse = {
      numberOfTrucks: 5,
      plan: [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]]
    };

    service.getSimulatedFleetPlan().subscribe(response => {
      expect(response).toEqual(fakeResponse);
    });

    const req = httpTestingController.expectOne(`${service.plansUrlFromLogi}/simulate/trucks`);
    expect(req.request.method).toEqual('GET');
    req.flush(fakeResponse);
  });

  it('should get fleet plan', () => {
    const fakeResponse = {
      numberOfTrucks: 5,
      plan: [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]]
    };

    service.getFleetPlan().subscribe(response => {
      expect(response).toEqual(fakeResponse);
    });

    const req = httpTestingController.expectOne(`${service.plansUrlFromLogi}/trucks`);
    expect(req.request.method).toEqual('GET');
    req.flush(fakeResponse);
  });

  it('should get time and list', () => {
    const fakeBody = {
      time: 42,
      list: [1, 2, 3, 4, 5]
    };

    const fakeResponse = {
      Z: 3600,
      H: [1, 2, 3, 4, 5]
    };

    service.getTimeList(fakeBody).subscribe(response => {
      expect(response).toEqual(fakeResponse);
    });

    const req = httpTestingController.expectOne(`${service.plansUrlFromLogi}/generate/sublist`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(fakeBody);
    req.flush(fakeResponse);
  });

  it('should get simulated time and list', () => {
    const fakeBody = {
      time: 42,
      list: [1, 2, 3, 4, 5]
    };

    const fakeResponse = {
      Z: 3600,
      H: [1, 2, 3, 4, 5]
    };

    service.getSimulatedTimeList(fakeBody).subscribe(response => {
      expect(response).toEqual(fakeResponse);
    });

    const req = httpTestingController.expectOne(`${service.plansUrlFromLogi}/simulate/generate/sublist`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(fakeBody);
    req.flush(fakeResponse);
  });
});

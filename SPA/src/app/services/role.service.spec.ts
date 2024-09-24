import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RoleService } from './role.service';
import { Role } from '../domain/role';

describe('RoleService', () => {
  let service: RoleService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RoleService]
    });

    service = TestBed.inject(RoleService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all roles', () => {
    const fakeRoles: Role[] = [
      { name: 'admin' },
      { name: 'logistics manager' },
      { name: 'driver' }
    ];

    service.getRoles().subscribe(roles => {
      expect(roles).toEqual(fakeRoles);
    });

    const req = httpTestingController.expectOne(service.rolesUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(fakeRoles);
  });
});

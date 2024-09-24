import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UsersService } from './users.service';
import {User} from "../domain/user";
import {FullRole} from "../domain/full-role";

describe('UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService]
    });

    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all Users', () => {
    const fakeUsers: User[] = [
      {role:'admin', email:'john@eletricgo.com', lastName:'Alexander',firstName:'John',phoneNumber:'91321221'},
      {role:'logistics manager', email:'jane@eletricgo.com', lastName:'Johnson',firstName:'Jane',phoneNumber:'93216782'}
    ];

    service.getUsers().subscribe(Users => {
      expect(Users).toEqual(fakeUsers);
    });

    const req = httpTestingController.expectOne(service.usersUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(fakeUsers);
  });

  it('should add a User', () => {
    const fakeUser: User = {
      role: 'admin',
      email: 'john@eletricgo.com',
      lastName: 'Alexander',
      firstName: 'John',
      phoneNumber: '91321221'
    };
    const fakeRole: FullRole = { id: '123', name: 'admin' };

    service.addUser(fakeUser).subscribe(User => {
      expect(User).toEqual(fakeUser);
    });

    // Expect a request to get the role ID
    const roleReq = httpTestingController.expectOne(`${service.rolesUrl}/${fakeUser.role}`);
    expect(roleReq.request.method).toEqual('GET');
    roleReq.flush(fakeRole);

    // Expect a request to add the User
    const req = httpTestingController.expectOne(service.authUrl + '/signup');
    expect(req.request.method).toEqual('POST');
    req.flush(fakeUser);
  });
});

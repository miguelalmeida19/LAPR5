import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj('HttpClient', ['post']);
    service = new AuthService(httpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should cancel the account', () => {
    const email = 'test@example.com';
    const body = {
      email: email
    };

    const result = service.cancelAccount(email);

    expect(httpClient.post).toHaveBeenCalledWith(`${service.usersUrl}/cancel`, body);
  });
});

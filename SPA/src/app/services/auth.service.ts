import { Injectable } from '@angular/core';
import {AppConfigService} from "../../AppConfigService";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {LoginResponse} from "../domain/login-response";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usersUrl = AppConfigService.logiApi + '/api/user';  // URL to web api
  authUrl = AppConfigService.logiApi + '/api/auth';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  login(email: string): Observable<LoginResponse> {
    const body = {
      email: email
    };

    return this.http.post<LoginResponse>(this.authUrl+"/login", body)
  }

  cancelAccount(email: string): any {
    const body = {
      email: email
    };

    return this.http.post<any>(this.usersUrl+"/cancel", body)
  }
}

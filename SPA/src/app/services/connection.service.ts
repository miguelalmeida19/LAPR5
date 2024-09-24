import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {filter, Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {Connection} from '../domain/connection';
import {MessageService} from './message.service';
import {AppConfigService} from "../../AppConfigService";


@Injectable({providedIn: 'root'})
export class ConnectionService {

  private connectionsUrl = AppConfigService.logiApi + '/api/connections';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  /** GET connections from the server */
  getConnections(): Observable<Connection[]> {
    console.log(this.connectionsUrl)
    return this.http.get<Connection[]>(this.connectionsUrl)
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {filter, Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {Role} from '../domain/role';
import {MessageService} from './message.service';
import {AppConfigService} from "../../AppConfigService";


@Injectable({providedIn: 'root'})
export class RoleService {

  rolesUrl = AppConfigService.logiApi + '/api/roles';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  /** GET roles from the server */
  getRoles(): Observable<Role[]> {
    console.log(this.rolesUrl)
    return this.http.get<Role[]>(this.rolesUrl)
      .pipe(
        //tap(_ => this.log('fetched roles')),
        catchError(this.handleError<Role[]>('getRoles', []))
      );
  }

  //////// Save methods //////////

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(error.error.replace("Error: ", ""));

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a RoleService message with the MessageService */
  private log(message: string) {
    this.messageService.add(message);
    this.messageService.displayError();
  }
}

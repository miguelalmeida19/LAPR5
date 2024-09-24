import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import { User } from '../domain/user';
import { MessageService } from './message.service';
import {AppConfigService} from "../../AppConfigService";
import {FullRole} from "../domain/full-role";


@Injectable({ providedIn: 'root' })
export class UsersService {

  usersUrl = AppConfigService.logiApi + '/api/users';  // URL to web api
  rolesUrl = AppConfigService.logiApi + '/api/roles';  // URL to web api
  authUrl = AppConfigService.logiApi + '/api/auth';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET Users from the server */
  getUsers(): Observable<User[]> {
    console.log(this.usersUrl)
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        //tap(_ => this.log('fetched Users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  //////// Save methods //////////

  /** POST: add a new User to the server */
  addUser(User: User): Observable<User> {
    // First, get the role ID from the server using the role name
    return this.http.get<FullRole>(`${this.rolesUrl}/${User.role}`).pipe(
      // Then, send the request with the role ID
      map((role: FullRole) => {
        // Replace the role name with the role ID
        User.role = role.id;
        return User;
      }),
      // Send the request
      switchMap((user: User) => this.http.post<User>(`${this.authUrl}/signup`, user, this.httpOptions)),
      //tap((newUser: User) => this.log(`added User w/ id=${newUser.UserId}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

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
      this.log(error.error.replace("Error: ",""));

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    this.messageService.add(message);
    this.messageService.displayError();
  }
}

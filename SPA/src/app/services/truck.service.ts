import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Truck } from '../domain/truck';
import { MessageService } from './message.service';
import {AppConfigService} from "../../AppConfigService";


@Injectable({ providedIn: 'root' })
export class TruckService {

  trucksUrl = AppConfigService.logiApi + '/api/trucks';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET trucks from the server */
  getTrucks(): Observable<Truck[]> {
    console.log(this.trucksUrl)
    return this.http.get<Truck[]>(this.trucksUrl)
      .pipe(
        //tap(_ => this.log('fetched trucks')),
        catchError(this.handleError<Truck[]>('getTrucks', []))
      );
  }

  /** GET truck by id. Will 404 if id not found */
  getTruck(id: string): Observable<Truck> {
    const url = `${this.trucksUrl}/${id}`;
    return this.http.get<Truck>(url).pipe(
      //tap(_ => this.log(`fetched truck id=${id}`)),
      catchError(this.handleError<Truck>(`getTruck id=${id}`))
    );
  }

  /* GET trucks whose name contains search term */
  searchTruck(term: string): Observable<Truck[]> {
    if (!term.trim()) {
      // if not search term, return empty truck array.
      return of([]);
    }
    return this.http.get<Truck[]>(`${this.trucksUrl}/?truckId=${term}`).pipe(
      //tap(x => x.length ?
      //  this.log(`found trucks matching "${term}"`) :
      //  this.log(`no trucks matching "${term}"`)),
      catchError(this.handleError<Truck[]>('searchTruck', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new truck to the server */
  addTruck(truck: Truck): Observable<Truck> {
    console.log(truck)
    return this.http.post<Truck>(this.trucksUrl, truck, this.httpOptions).pipe(
      //tap((newTruck: Truck) => this.log(`added truck w/ id=${newTruck.truckId}`)),
      catchError(this.handleError<Truck>('addTruck'))
    );
  }

  changeActivate(truck: Truck) : void {
    if (truck.active){
      const url = `${this.trucksUrl}/deactivate`;
      this.http.patch<Truck>(url, { truckId: truck.truckId }).subscribe();
    }else {
      const url = `${this.trucksUrl}/activate`;
      this.http.patch<Truck>(url, { truckId: truck.truckId }).subscribe();
    }
  }


  /** PUT: update the truck on the server */
  updateTruck(truck: Truck): Observable<any> {
    console.log(truck)
    return this.http.put(this.trucksUrl, truck, this.httpOptions).pipe(
      //tap(_ => this.log(`updated truck id=${truck.truckId}`)),
      catchError(this.handleError<any>('updateTruck'))
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

  /** Log a TruckService message with the MessageService */
  private log(message: string) {
    this.messageService.add(message);
    this.messageService.displayError();
  }
}

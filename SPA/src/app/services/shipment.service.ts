import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {Shipment} from '../domain/shipment';
import {MessageService} from './message.service';
import {AppConfigService} from "../../AppConfigService";

@Injectable({providedIn: 'root'})
export class ShipmentService {

  shipmentsUrl = AppConfigService.logiApi + '/api/shipments'; // URL to Web API

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** GET shipments from the server */
  getShipments(): Observable<Shipment[]> {
    console.log(this.shipmentsUrl);
    return this.http.get<Shipment[]>(this.shipmentsUrl)
      .pipe(
        //tap(_ => this.log('fetched shipments')),
        catchError(this.handleError<Shipment[]>('getShipments', []))
      );
  }

  /** GET shipment by id. Return `undefined` when id not found */
  getShipmentNo404<Data>(id: number): Observable<Shipment> {
    const url = `${this.shipmentsUrl}/?id=${id}`;
    return this.http.get<Shipment[]>(url)
      .pipe(
        map(shipments => shipments[0]),
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} shipment id=${id}`);
        }),
        catchError(this.handleError<Shipment>(`getShipment id=${id}`))
      );
  }

  /** GET shipment by id. Will be 404 if id not found */
  getShipment(id: string): Observable<Shipment> {
    const url = `${this.shipmentsUrl}/${id}`;
    return this.http.get<Shipment>(url).pipe(
      //tap(_ => this.log(`fetched shipment id=${id}`)),
      catchError(this.handleError<Shipment>(`getShipment id=${id}`))
    );
  }

  /* GET shipments whose name contains search term */
  searchShipment(term: string): Observable<Shipment[]> {
    if (!term.trim()) {
      // if not search term, return empty shipment array.
      return this.getShipments();
    }
    return this.http.get<Shipment[]>(`${this.shipmentsUrl}/id/${term}`).pipe(
      //tap(x => x.length ?
      //   this.log(`found shipments matching "${term}"`) :
      //   this.log(`no shipments matching "${term}"`)),
      catchError(this.handleError<Shipment[]>('searchShipment', [])));
  }

  /* GET shipments whose name contains a given truckId */
  searchTruckId(term: string): Observable<Shipment[]> {
    if (!term.trim() || term.includes("Filter")) {
      // if not search term, return empty shipments array.
      return this.getShipments();
    }
    return this.http.get<Shipment[]>(`${this.shipmentsUrl}/truckId/${term}`).pipe(
      //tap(x => x.length ?
      //   this.log(`found shipments matching "${term}"`) :
      //   this.log(`no shipments matching "${term}"`)),
      catchError(this.handleError<Shipment[]>('searchTruckId', [])));
  }

  /* GET paginate shipments */
  paginateShipments(nResults: number, page: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.shipmentsUrl}/n/${nResults}/p/${page}`)
  }

  ///////////// SAVE METHODS /////////////

  /** POST: add a new Shipment to the server */
  addShipment(shipment: Shipment): Observable<Shipment> {
    console.log(shipment);
    return this.http.post<Shipment>(this.shipmentsUrl, shipment, this.httpOptions).pipe(
      //tap((newShipment: Shipment) => this.log(`added shipment w/ id=${newShipment.id}`)),
      catchError(this.handleError<Shipment>('addShipment'))
    );
  }

  /** DELETE: delete the shipment from the server */
  deleteShipment(id: string): Observable<Shipment> {
    const url = `${this.shipmentsUrl}/${id}`;
    return this.http.delete<Shipment>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted shipment id=${id}`)),
      catchError(this.handleError<Shipment>('deleteShipment'))
    );
  }

  /** PUT: update the shipment on the server */
  updateShipment(shipment: Shipment): Observable<any> {
    console.log(shipment);
    return this.http.put(this.shipmentsUrl, shipment, this.httpOptions).pipe(
      //tap(_ => this.log(`updated shipment id=${shipment.id}`)),
      catchError(this.handleError<any>('updateShipment'))
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
      this.log(error.error.replace("Error: ", ""));

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ShipmentService message with the MessageService */
  private log(message: string) {
    this.messageService.add(message);
    this.messageService.displayError();
  }
}

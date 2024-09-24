import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Delivery } from "../domain/delivery";
import { MessageService } from "./message.service";
import { AppConfigService } from "../../AppConfigService";

@Injectable({ providedIn: 'root' })
export class DeliveryService {

  deliveriesUrl = AppConfigService.wmApi + '/api/deliveries';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET deliveries from the server */
  getDeliveries(): Observable<Delivery[]> {
    console.log(this.deliveriesUrl)
    return this.http.get<Delivery[]>(this.deliveriesUrl)
      .pipe(
        //tap(_ => this.log('fetched deliveries')),
        catchError(this.handleError<Delivery[]>('getDeliveries', []))
      );
  }

  /** GET delivery by id. Return `undefined` when id not found */
  getDeliveryNo404<Data>(id: string): Observable<Delivery> {
    const url = `${this.deliveriesUrl}/?id=${id}`;
    return this.http.get<Delivery[]>(url)
      .pipe(
        map(deliveries => deliveries[0]), // returns a {0|1} element array
        tap(h => {
          //const outcome = h ? 'fetched' : 'did not find';
          //this.log(`${outcome} path id=${id}`);
        }),
        catchError(this.handleError<Delivery>(`getDelivery id=${id}`))
      );
  }

  /** GET delivery by id. Will 404 if id not found */
  getDelivery(id: string): Observable<Delivery> {
    const url = `${this.deliveriesUrl}/${id}`;
    return this.http.get<Delivery>(url).pipe(
      //tap(_ => this.log(`fetched delivery id=${id}`)),
      catchError(this.handleError<Delivery>(`getDelivery id=${id}`))
    );
  }

  searchDeliveries(term: string): Observable<Delivery[]> {
    console.log(term);
    if (!term.trim()) {
      // if no search term, return empty array
      return this.getDeliveries();
    }
    return this.http.get<Delivery[]>(`${this.deliveriesUrl}/id/${term}`).pipe(
      //tap(x => x.length ?
      //   this.log(`found deliveries matching "${term}"`) :
      //   this.log(`no deliveries matching "${term}"`)),
      catchError(this.handleError<Delivery[]>('searchDelivery', [])));
  }

  searchDeliveriesByWeight(term: string): Observable<Delivery[]> {
    if (!term.trim()) {
      // if no search term, return empty array
      return this.getDeliveries();
    }
    return this.http.get<Delivery[]>(`${this.deliveriesUrl}/weight/${term}`).pipe(
      //tap(x => x.length ?
      //   this.log(`found deliveries matching "${term}"`) :
      //   this.log(`no deliveries matching "${term}"`)),
      catchError(this.handleError<Delivery[]>('searchDeliveriesByWeight', [])));
  }

  searchDeliveriesByWarehouse(term: string): Observable<Delivery[]> {
    if (!term.trim()) {
      // if no search term, return empty array
      return this.getDeliveries();
    }
    return this.http.get<Delivery[]>(`${this.deliveriesUrl}/warehouseId/${term}`).pipe(
      //tap(x => x.length ?
      //   this.log(`found deliveries matching "${term}"`) :
      //   this.log(`no deliveries matching "${term}"`)),
      catchError(this.handleError<Delivery[]>('searchDeliveriesByWarehouse', [])));
  }

  //////// Save methods //////////

  /** POST: add a new delivery to the server */
  addDelivery(delivery: Delivery): Observable<Delivery> {
    console.log(delivery)
    return this.http.post<Delivery>(this.deliveriesUrl, delivery, this.httpOptions).pipe(
      //tap((newDelivery: Delivery) => this.log(`added delivery w/ id=${newDelivery.deliveryId}`)),
      catchError(this.handleError<Delivery>('addDelivery'))
    );
  }

  /** DELETE: delete delivery from the server */
  deleteDelivery(id: string): Observable<Delivery> {
    const url = `${this.deliveriesUrl}/${id}`;

    return this.http.delete<Delivery>(url, this.httpOptions).pipe(
      //tap(_ => this.log(`deleted delivery id=${id}`)),
      catchError(this.handleError<Delivery>('deleteDelivery'))
    );
  }

  /** PUT: update the delivery on the server */
  updateDelivery(delivery: Delivery): Observable<any> {
    return this.http.put(this.deliveriesUrl+"/" + delivery.id, delivery, this.httpOptions).pipe(
      //tap(_ => this.log(`updated delivery id=${delivery.id}`)),
      catchError(this.handleError<any>('updateDelivery'))
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

  /** Log a DeliveryService message with the MessageService */
  private log(message: string) {
    this.messageService.add(message);
    this.messageService.displayError();
  }
}

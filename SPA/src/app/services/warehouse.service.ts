import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Warehouse} from "../domain/warehouse";
import {MessageService} from "./message.service";
import {AppConfigService} from "../../AppConfigService";

@Injectable({ providedIn: 'root'})
export class WarehouseService{

  warehouseUrl = AppConfigService.wmApi + '/api/warehouse'; //URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET warehouses from the server */
  getWarehouses(): Observable<Warehouse[]> {
    console.log(this.warehouseUrl)
    return this.http.get<Warehouse[]>(this.warehouseUrl)
      .pipe(
        //tap(_ => this.log('fetched warehouses')),
        catchError(this.handleError<Warehouse[]>('getWarehouses', []))
      );
  }

  /** GET warehouse by id. Will 404 if id not found */
  getWarehouse(id: string): Observable<Warehouse> {
    const url = `${this.warehouseUrl}/${id}`;
    return this.http.get<Warehouse>(url).pipe(
      //tap(_ => this.log(`fetched warehouse id=${id}`)),
      catchError(this.handleError<Warehouse>(`getWarehouse id=${id}`))
    );
  }

  /** GET warehouses whose name contains search term */
  searchWarehouse(term: string): Observable<Warehouse[]> {
    console.log(term)
    if (!term.trim()) {
      // if not search term, return empty warehouse array.
      return this.getWarehouses();
    }
    return this.http.get<Warehouse[]>(`${this.warehouseUrl}/id/${term}`).pipe(
      //tap(x => x.length ?
      //   this.log(`found warehouses matching "${term}"`) :
      //   this.log(`no warehouses matching "${term}"`)),
      catchError(this.handleError<Warehouse[]>('searchWarehouse', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new warehouse to the server */
  addWarehouse(warehouse: Warehouse): Observable<Warehouse> {
    console.log(warehouse)
    return this.http.post<Warehouse>(this.warehouseUrl, warehouse, this.httpOptions).pipe(
      //tap((newWarehouse: Warehouse) => this.log(`added warehouse w/ id=${newWarehouse.warehouseId}`)),
      catchError(this.handleError<Warehouse>('addWarehouse'))
    );
  }

  changeActivate(warehouse: Warehouse) : void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    if (warehouse.active){
      const id = warehouse.id;
      const url = `${this.warehouseUrl}/deactivate`;
      this.http.patch<Warehouse>(url, id, httpOptions).subscribe();
    }else {
      const id = warehouse.id;
      const url = `${this.warehouseUrl}/activate`;
      this.http.patch<Warehouse>(url, id, httpOptions).subscribe();
    }
  }

  /** PUT: update the warehouse on the server */
  updateWarehouse(warehouse: Warehouse): Observable<any> {
    return this.http.put(this.warehouseUrl+"/"+warehouse.id, warehouse, this.httpOptions).pipe(
      //tap(_ => this.log(`updated warehouse id=${warehouse.id}`)),
      catchError(this.handleError<any>('updateWarehouse'))
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

  /** Log a WarehouseService message with the MessageService */
  private log(message: string) {
    this.messageService.add(message);
    this.messageService.displayError();
  }
}

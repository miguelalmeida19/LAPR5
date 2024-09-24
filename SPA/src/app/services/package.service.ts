import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {Package} from '../domain/package';
import {MessageService} from './message.service';
import {AppConfigService} from "../../AppConfigService";

@Injectable({providedIn: 'root'})
export class PackageService {

  packagesUrl = AppConfigService.logiApi + '/api/packages';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** GET packages from the server */
  getPackages(): Observable<Package[]> {
    console.log(this.packagesUrl);
    return this.http.get<Package[]>(this.packagesUrl)
      .pipe(
        //tap(_ => this.log('fetched packages')),
        catchError(this.handleError<Package[]>('getPackages', []))
      );
  }

  /** GET package by id. Return `undefined` when id not found */
  getPackageNo404<Data>(id: number): Observable<Package> {
    const url = `${this.packagesUrl}/?id=${id}`;
    return this.http.get<Package[]>(url)
      .pipe(
        map(packages => packages[0]),
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} package id=${id}`);
        }),
        catchError(this.handleError<Package>(`getPackage id=${id}`))
      );
  }

  /** GET package by id. Will be 404 if id not found */
  getPackage(id: string): Observable<Package> {
    const url = `${this.packagesUrl}/${id}`;
    return this.http.get<Package>(url).pipe(
      //tap(_ => this.log(`fetched package id=${id}`)),
      catchError(this.handleError<Package>(`getPackage id=${id}`))
    );
  }

  /* GET packages whose name contains search term */
  searchPackage(term: string): Observable<Package[]> {
    if (!term.trim()) {
      // if not search term, return empty shipment array.
      return this.getPackages();
    }
    return this.http.get<Package[]>(`${this.packagesUrl}/id/${term}`).pipe(
      //tap(x => x.length ?
      //   this.log(`found packages matching "${term}"`) :
      //   this.log(`no packages matching "${term}"`)),
      catchError(this.handleError<Package[]>('searchPackage', [])));
  }

  /* GET packages that are being delivered by a given ShipmentId */
  searchShipmentId(term: string): Observable<Package[]> {
    if (!term.trim() || term.includes("Filter")) {
      // if not search term, return empty packages array.
      return this.getPackages();
    }
    return this.http.get<Package[]>(`${this.packagesUrl}/shipmentId/${term}`).pipe(
      //tap(x => x.length ?
      //   this.log(`found packages matching "${term}"`) :
      //   this.log(`no packages matching "${term}"`)),
      catchError(this.handleError<Package[]>('searchShipmentId', [])));
  }

  /* GET package that are delivering a given DeliveryId */
  searchDeliveryId(term: string): Observable<Package> {
    if (!term.trim() || term.includes("Filter")) {
      // if not search term, return empty package
      return this.getPackage("id");
    }
    return this.http.get<Package>(`${this.packagesUrl}/shipmentId/${term}`).pipe(
      //tap(x => x.length ?
      //   this.log(`found packages matching "${term}"`) :
      //   this.log(`no packages matching "${term}"`)),
      catchError(this.handleError<Package>('searchDeliveryId')));
  }

  /* GET paginate packages */
  paginatePackages(nResults: number, page: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.packagesUrl}/n/${nResults}/p/${page}`)
  }

  ///////////// SAVE METHODS /////////////

  /** POST: add a new Package to the server */
  addPackage(_package: Package): Observable<Package> {
    console.log(_package);
    return this.http.post<Package>(this.packagesUrl, _package, this.httpOptions).pipe(
      //tap((newPackage: Package) => this.log(`added package w/ id=${newPackage.id}`)),
      catchError(this.handleError<Package>('addPackage'))
    );
  }

  /** DELETE: delete the Package from the server */
  deletePackage(id: string): Observable<Package> {
    const url = `${this.packagesUrl}/${id}`;
    return this.http.delete<Package>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted shipment id=${id}`)),
      catchError(this.handleError<Package>('deletePackage'))
    );
  }

  /** PUT: update the Package on the server */
  updatePackage(_package: Package): Observable<any> {
    console.log(_package);
    return this.http.put(this.packagesUrl, _package, this.httpOptions).pipe(
      //tap(_ => this.log(`updated package id=${package.id}`)),
      catchError(this.handleError<any>('updatePackage'))
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

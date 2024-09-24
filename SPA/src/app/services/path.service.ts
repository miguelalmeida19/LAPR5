import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {filter, Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {Path} from '../domain/path';
import {MessageService} from './message.service';
import {AppConfigService} from "../../AppConfigService";


@Injectable({providedIn: 'root'})
export class PathService {

  pathsUrl = AppConfigService.logiApi + '/api/paths';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  /** GET paths from the server */
  getPaths(): Observable<Path[]> {
    console.log(this.pathsUrl)
    return this.http.get<Path[]>(this.pathsUrl)
      .pipe(
        catchError(this.handleError<Path[]>('getPaths', []))
      );
  }

  /** GET path by id. Will 404 if id not found */
  getPath(id: string): Observable<Path> {
    const url = `${this.pathsUrl}/${id}`;
    return this.http.get<Path>(url).pipe(
      catchError(this.handleError<Path>(`getPath id=${id}`))
    );
  }

  /* GET paths whose name contains search term */
  searchPath(term: string): Observable<Path[]> {
    if (!term.trim()) {
      // if not search term, return empty path array.
      return this.getPaths();
    }
    return this.http.get<Path[]>(`${this.pathsUrl}/id/${term}`).pipe(
      catchError(this.handleError<Path[]>('searchPath', [])));
  }

  /* GET paths whose departure contains search term */
  searchDepartureWarehouse(term: string): Observable<Path[]> {
    if (!term.trim() || term.includes("Filter")) {
      // if not search term, return empty path array.
      return this.getPaths();
    }

    return this.http.get<Path[]>(`${this.pathsUrl}/departureWarehouse/${term}`).pipe(
      catchError(this.handleError<Path[]>('searchDepartureWarehouse', [])));
  }

  /* GET paths whose departure and arrival */
  searchDepartureArrivalWarehouse(term: string, term1:string): Observable<Path[]> {
    if (!term.trim() || !term1.trim() || term1.includes("Filter") || term.includes("Filter")) {
      // if not search term, return empty path array.
      return this.getPaths();
    }

    return this.http.get<Path[]>(`${this.pathsUrl}/departureWarehouse/${term}/arrivalWarehouse/${term1}`)
      .pipe(
        catchError(this.handleError<Path[]>('getPaths', []))
      );
  }

  /* GET paths whose arrival contains search term */
  searchArrivalWarehouse(term: string): Observable<Path[]> {
    if (!term.trim() || term.includes("Filter")) {
      // if not search term, return empty path array.
      return this.getPaths();
    }

    return this.http.get<Path[]>(`${this.pathsUrl}/arrivalWarehouse/${term}`).pipe(
      catchError(this.handleError<Path[]>('searchArrivalWarehouse', [])));
  }

  /* GET paginate paths */
  paginatePaths(nResults: number,page: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.pathsUrl}/n/${nResults}/p/${page}`)
  }

  //////// Save methods //////////

  /** POST: add a new path to the server */
  addPath(path: Path): Observable<Path> {
    console.log(path)
    return this.http.post<Path>(this.pathsUrl, path, this.httpOptions).pipe(
      catchError(this.handleError<Path>('addPath'))
    );
  }

  /** PUT: update the path on the server */
  updatePath(path: Path): Observable<any> {
    console.log(path)
    return this.http.put(this.pathsUrl, path, this.httpOptions).pipe(
      catchError(this.handleError<any>('updatePath'))
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

  /** Log a PathService message with the MessageService */
  private log(message: string) {
    this.messageService.add(message);
    this.messageService.displayError();
  }
}

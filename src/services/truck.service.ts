import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError, map } from "rxjs";

import { ITruck } from "../app/model/truck";

@Injectable({
  providedIn: 'root'
})
export class TruckService {
  private gettruckUrl = 'http://localhost:3000/truck';
  private createtruckUrl = 'http://localhost:3000/truck/create';
  private updatetruckUrl = 'http://localhost:3000/truck/';

  constructor(private http: HttpClient) { }

  createTruck(body: ITruck): Observable<any> {
    const headers = { 'content-type': 'application/json',
                      'Access-Control-Allow-Origin': '*'
                    }  
    return this.http.post<any>(this.createtruckUrl, body, {headers: headers})
      .pipe(
        tap(data => console.log('Create: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  updateTruck(body: ITruck): Observable<any> {
    const headers = { 'content-type': 'application/json',
                      'Access-Control-Allow-Origin': '*'
                    }  
    return this.http.put<any>(this.updatetruckUrl+body.id, body, {headers: headers})
      .pipe(
        tap(data => console.log('Create: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getTrucks(): Observable<ITruck[]> {
    return this.http.get<ITruck[]>(this.gettruckUrl)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  // Get one Truck
  // Since we are working with a json file, we can only retrieve all trucks
  // So retrieve all trucks and then find the one we want using 'map'
  getTruck(id: number): Observable<ITruck | undefined> {
    return this.getTrucks()
      .pipe(
        map((trucks: ITruck[]) => trucks.find(p => p.id === id))
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

}

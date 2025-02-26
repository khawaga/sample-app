import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HelloService {

  private helloEndpoint = '/hello';  // URL to web api

  constructor(
    private http: HttpClient) { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  sayHello(name: string): Observable<string> {
    const url = `${this.helloEndpoint}/${name}`;
    return this.http.get<string>(url)
      .pipe(
        tap(_ => console.log(`said hello to ${name}`)),
        catchError(this.handleError<string>('sayHello'))
      );
  }
}

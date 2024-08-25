import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http = inject(HttpClient);
  private options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor() {}
  get<T>(url: string) {
    return this.http.get<T>(url);
  }
  post<T>(url: string, data: T) {
    return this.http.post<T>(url, data, this.options);
  }
  delete<T>(url: string) {
    return this.http.delete<T>(url);
  }
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed : ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
}

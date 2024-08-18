import { inject, Injectable } from '@angular/core';
import { Quote } from '../interfaces/quote';
import { HttpService } from './http.service';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  http = inject(HttpService);
  urls = inject(UrlService);
  constructor() {}
  post(data: Quote) {
    const url = `${this.urls.QUOTE_API}/create`;
    return this.http.post<Quote>(url, data);
  }
  get() {
    const url = `${this.urls.QUOTE_API}`;
    return this.http.get<Quote[]>(url);
  }
}

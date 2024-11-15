import { inject, Injectable } from '@angular/core';
import { Quote } from '../interfaces/quote';
import { UrlService } from './url.service';
@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private $axios = inject(UrlService).$axios;
  constructor() {}
  async getQuotes() {
    const res = await this.$axios.get(`/quotes`);
    return res.data;
  }
  async addQuote(quote: Partial<Quote>): Promise<Quote> {
    const req = await this.$axios.post('/quotes', quote);
    return req.data;
  }
  async deleteQuote(id: string) {
    const req = await this.$axios.delete(`/quotes/${id}`);
    return req.data;
  }
}

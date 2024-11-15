import { inject, Injectable } from '@angular/core';
import { Book } from '../interfaces/book';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private $axios = inject(UrlService).$axios;
  constructor() {}
  async getBooks() {
    const res = await this.$axios.get(`/books`);
    return res.data;
  }
  async addBook(quote: Partial<Book>): Promise<Book> {
    const req = await this.$axios.post('/books', quote);
    return req.data;
  }
  async deleteBook(id: string) {
    const req = await this.$axios.delete(`/books/${id}`);
    return req.data;
  }
}

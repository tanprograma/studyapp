import { inject, Injectable, signal } from '@angular/core';
import { Article } from '../interfaces/article';
import { catchError } from 'rxjs';

import { HttpService } from './http.service';
import { UrlService } from './url.service';
@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  http = inject(HttpService);
  urls = inject(UrlService);
  constructor() {}
  post(data: Article) {
    const url = `${this.urls.ARTICLE_API}/create`;
    return this.http
      .post<Article>(url, data)
      .pipe(
        catchError(this.http.handleError<Article | undefined>('Article post'))
      );
  }
  getAll() {
    const url = `${this.urls.ARTICLE_API}`;
    return this.http
      .get<Article[]>(url)
      .pipe(catchError(this.http.handleError<Article[]>('Article fetch', [])));
  }
  getOne(id: string) {
    const url = `${this.urls.ARTICLE_API}/${id}`;
    return this.http
      .get<Article>(url)
      .pipe(catchError(this.http.handleError<Article>('Articles fetch')));
  }
  article = signal<Article>({ title: '', content: [] });
}

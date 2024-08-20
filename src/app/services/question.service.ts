import { inject, Injectable } from '@angular/core';
import { Question } from '../interfaces/question';
import { HttpService } from './http.service';
import { UrlService } from './url.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  http = inject(HttpService);
  urls = inject(UrlService);
  constructor() {}
  post(data: Question) {
    const url = `${this.urls.QUESTION_API}/create`;
    return this.http
      .post<Question>(url, data)
      .pipe(
        catchError(
          this.http.handleError<Question | undefined>('question fetch')
        )
      );
  }
  get() {
    const url = `${this.urls.QUESTION_API}`;
    return this.http
      .get<Question[]>(url)
      .pipe(
        catchError(this.http.handleError<Question[]>('question fetch', []))
      );
  }
  getID(id: string) {
    const url = `${this.urls.QUESTION_API}/${id}`;

    return this.http
      .get<Question[]>(url)
      .pipe(
        catchError(this.http.handleError<Question[]>('question fetch', []))
      );
  }
}

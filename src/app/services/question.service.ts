import { inject, Injectable } from '@angular/core';
import { Question } from '../interfaces/question';
import { HttpService } from './http.service';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  http = inject(HttpService);
  urls = inject(UrlService);
  constructor() {}
  post(data: Question) {
    const url = `${this.urls.QUESTION_API}/create`;
    return this.http.post<Question>(url, data);
  }
  get() {
    const url = `${this.urls.QUESTION_API}`;
    return this.http.get<Question[]>(url);
  }
  getID(id: string) {
    const url = `${this.urls.NOTE_API}/${id}`;

    return this.http.get<Question[]>(url);
  }
}

import { inject, Injectable } from '@angular/core';
import { Exam } from '../interfaces/exam';
import { catchError } from 'rxjs';

import { HttpService } from './http.service';
import { UrlService } from './url.service';
import { MCQ } from '../interfaces/mcq';
@Injectable({
  providedIn: 'root',
})
export class McqService {
  http = inject(HttpService);
  urls = inject(UrlService);
  constructor() {}
  post(data: Exam) {
    const url = `${this.urls.EXAM_API}/create`;
    return this.http
      .post<Exam>(url, data)
      .pipe(catchError(this.http.handleError<Exam | undefined>('exam post')));
  }
  getAll() {
    const url = `${this.urls.EXAM_API}`;
    return this.http
      .get<Exam[]>(url)
      .pipe(catchError(this.http.handleError<Exam[]>('exams fetch', [])));
  }
  getAllExamResults() {
    const url = `${this.urls.RESULT_API}`;
    return this.http
      .get<Exam[]>(url)
      .pipe(catchError(this.http.handleError<Exam[]>('results fetch', [])));
  }
  getOneExamResult(examID: string) {
    const url = `${this.urls.RESULT_API}/${examID}`;
    return this.http
      .get<Exam>(url)
      .pipe(catchError(this.http.handleError<undefined>('exams fetch')));
  }
  getOne(examID: string) {
    const url = `${this.urls.EXAM_API}/${examID}`;
    return this.http
      .get<Exam>(url)
      .pipe(catchError(this.http.handleError<undefined>('exams fetch')));
  }
  mark(data: Exam) {
    const url = `${this.urls.RESULT_API}/create`;
    return this.http
      .post<any>(url, data)
      .pipe(
        catchError(this.http.handleError<Exam | boolean>('mark exam', false))
      );
  }
}

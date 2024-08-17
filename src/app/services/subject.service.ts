import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { UrlService } from './url.service';
import { Subject } from '../interfaces/subject';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  http = inject(HttpService);
  urls = inject(UrlService);
  constructor() {}
  post(data: Subject) {
    const url = `${this.urls.SUBJECT_API}/create`;
    return this.http.post<Subject>(url, data);
  }
  get() {
    const url = `${this.urls.SUBJECT_API}`;
    return this.http.get<Subject[]>(url);
  }
}

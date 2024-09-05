import { inject, Injectable } from '@angular/core';

import { HttpService } from './http.service';
import { UrlService } from './url.service';
import { Subtopic } from '../interfaces/subtopic';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubtopicService {
  http = inject(HttpService);
  urls = inject(UrlService);
  constructor() {}
  post(data: Subtopic) {
    const url = `${this.urls.SUBTOPIC_API}/create`;
    return this.http
      .post<Subtopic>(url, data)
      .pipe(catchError(this.http.handleError<Subtopic>('subtopic post')));
  }
  get() {
    const url = `${this.urls.SUBTOPIC_API}`;
    return this.http
      .get<Subtopic[]>(url)
      .pipe(
        catchError(this.http.handleError<Subtopic[]>('subtopic fetch', []))
      );
  }
  delete(id: string) {
    const url = `${this.urls.SUBTOPIC_API}/delete/${id}`;
    return this.http
      .delete<{ success: boolean; result: Subtopic }>(url)
      .pipe(
        catchError(
          this.http.handleError<{ success: boolean; result: Subtopic }>(
            'delete subtopic'
          )
        )
      );
  }
  // getID<T>(name: string, items: T[]) {
  //   return items.find((item) => topic.name == topicName)?._id as string;
  // }
  // getName(topicID: string, topics: Topic[]) {
  //   return topics.find((topic) => topic._id == topicID)?.name as string;
  // }
}

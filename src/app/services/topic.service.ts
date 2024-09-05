import { inject, Injectable } from '@angular/core';
import { catchError, Subject } from 'rxjs';
import { HttpService } from './http.service';
import { UrlService } from './url.service';
import { Topic } from '../interfaces/topic';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  http = inject(HttpService);
  urls = inject(UrlService);
  constructor() {}
  post(data: Topic) {
    const url = `${this.urls.TOPIC_API}/create`;
    return this.http
      .post<Topic>(url, data)
      .pipe(catchError(this.http.handleError<Topic>('topic fetch')));
  }
  get() {
    const url = `${this.urls.TOPIC_API}`;
    return this.http
      .get<Topic[]>(url)
      .pipe(catchError(this.http.handleError<Topic[]>('topic fetch', [])));
  }
  getTopicID(topicName: string, topics: Topic[]) {
    return topics.find((topic) => topic.name == topicName)?._id as string;
  }
  getTopicName(topicID: string, topics: Topic[]) {
    return topics.find((topic) => topic._id == topicID)?.name as string;
  }
}

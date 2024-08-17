import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
    return this.http.post<Topic>(url, data);
  }
  get() {
    const url = `${this.urls.TOPIC_API}`;
    return this.http.get<Topic[]>(url);
  }
}

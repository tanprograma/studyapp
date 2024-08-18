import { inject, Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { Subject } from 'rxjs';
import { HttpService } from './http.service';
import { UrlService } from './url.service';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpService);
  urls = inject(UrlService);
  constructor() {}
  post(data: Todo) {
    const url = `${this.urls.TODO_API}/create`;
    return this.http.post<Todo>(url, data);
  }
  get() {
    const url = `${this.urls.TODO_API}`;
    return this.http.get<Todo[]>(url);
  }
}

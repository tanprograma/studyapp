import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { UrlService } from './url.service';
import { Note } from '../interfaces/note';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  http = inject(HttpService);
  urls = inject(UrlService);
  constructor() {}
  post(data: Note) {
    const url = `${this.urls.NOTE_API}/create`;
    return this.http
      .post<Note>(url, data)
      .pipe(catchError(this.http.handleError<Note | undefined>('todo post')));
  }
  get() {
    const url = `${this.urls.NOTE_API}`;
    return this.http
      .get<Note[]>(url)
      .pipe(catchError(this.http.handleError<Note[]>('notes fetch', [])));
  }
  getID(id: string) {
    const url = `${this.urls.NOTE_API}/${id}`;

    return this.http
      .get<Note[]>(url)
      .pipe(catchError(this.http.handleError<Note[]>('notes fetch', [])));
  }
}

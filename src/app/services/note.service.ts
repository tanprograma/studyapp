import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { UrlService } from './url.service';
import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  http = inject(HttpService);
  urls = inject(UrlService);
  constructor() {}
  post(data: Note) {
    const url = `${this.urls.NOTE_API}/create`;
    return this.http.post<Note>(url, data);
  }
  get() {
    const url = `${this.urls.NOTE_API}`;
    return this.http.get<Note[]>(url);
  }
  getID(id: string) {
    const url = `${this.urls.NOTE_API}/${id}`;

    return this.http.get<Note[]>(url);
  }
}

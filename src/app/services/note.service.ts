import { inject, Injectable } from '@angular/core';
import { Note } from '../interfaces/note';
import { UrlService } from './url.service';
import { NotesFilter } from '../store/note.store';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private $axios = inject(UrlService).$axios;
  constructor() {}
  async getNotes({ topic }: { topic: string }) {
    const res = await this.$axios.get(`/notes?topic=${topic}`);
    return res.data;
  }
  async addNote(note: Partial<Note>[]): Promise<Note[]> {
    const req = await this.$axios.post('/notes', note);
    return req.data;
  }
  async deleteNote(id: string) {
    const req = await this.$axios.delete(`/notes/${id}`);
    return req.data;
  }
  async updateNote(id: string, payload: Partial<Note>) {
    const req = await this.$axios.post(`/notes/${id}`, payload);
    return req.data;
  }
}

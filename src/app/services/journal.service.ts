import { inject, Injectable } from '@angular/core';
import { Journal } from '../interfaces/journal';
import { UrlService } from './url.service';
@Injectable({
  providedIn: 'root',
})
export class JournalService {
  private $axios = inject(UrlService).$axios;
  constructor() {}
  async getJournal() {
    const res = await this.$axios.get(`/journal`);
    return res.data;
  }
  async addEntry(note: Partial<Journal>): Promise<Journal> {
    const req = await this.$axios.post('/journal', note);
    return req.data;
  }
  async deleteEntry(id: string) {
    const req = await this.$axios.delete(`/journal/${id}`);
    return req.data;
  }
}

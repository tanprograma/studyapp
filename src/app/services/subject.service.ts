import { inject, Injectable } from '@angular/core';

import { UrlService } from './url.service';
import { Subject } from '../interfaces/subject';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private $axios = inject(UrlService).$axios;
  constructor() {}
  async getSubjects() {
    const res = await this.$axios.get(`/subjects`);
    return res.data;
  }
  async addSubject(quote: Partial<Subject>): Promise<Subject> {
    const req = await this.$axios.post('/subjects', quote);
    return req.data;
  }
  async deleteSubject(id: string) {
    const req = await this.$axios.delete(`/subjects/${id}`);
    return req.data;
  }
}

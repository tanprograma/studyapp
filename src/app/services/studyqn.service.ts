import { inject, Injectable } from '@angular/core';
import { StudyQuestion } from '../interfaces/exam';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root',
})
export class StudyqnService {
  private $axios = inject(UrlService).$axios;
  constructor() {}
  async getStudyQuestions({ topic }: { topic: string }) {
    const res = await this.$axios.get(`/study?topic=${topic}`);
    return res.data;
  }
  async addStudyQuestion(
    studyQuestion: Partial<StudyQuestion>[]
  ): Promise<StudyQuestion[]> {
    const req = await this.$axios.post('/study', studyQuestion);
    return req.data;
  }
  async deleteStudyQuestion(id: string) {
    const req = await this.$axios.delete(`/study/${id}`);
    return req.data;
  }
  async updateStudyQuestion(id: string, payload: Partial<StudyQuestion>) {
    const req = await this.$axios.post(`/study/${id}`, payload);
    return req.data;
  }
}

import { inject, Injectable } from '@angular/core';
import { Choice, Exam, ExamResult } from '../interfaces/exam';
import { UrlService } from './url.service';
import { ExamPreview } from '../store/exam.store';
import { patchState } from '@ngrx/signals';
import { USER_STATE } from '../store/user.store';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root',
})
export class ExamService {
  userService = inject(UserService);
  $axios = inject(UrlService).$axios;
  userState = inject(USER_STATE);
  constructor() {}
  async getExamPreviews(): Promise<ExamPreview[]> {
    const res = await this.$axios.get('/exams/preview');
    return res.data;
  }
  async getExam(id: string) {
    const res = await this.$axios.get(`/exams/exam/${id}`);
    return res.data;
  }
  async createExam(payload: Partial<Exam>): Promise<Exam> {
    const user = await this.$axios.post('/exams', payload);
    return user.data;
  }

  async saveExamResults(payload: Partial<ExamResult>): Promise<ExamResult> {
    const user = await this.$axios.post('/exam-results', {
      ...payload,
    });
    return user.data;
  }
  async getExamResults(id: string): Promise<ExamResult> {
    const isUser = this.userService.isLoggedIn() as string;
    const user = await this.$axios.get(`/exam-results/result${id}`);
    return user.data;
  }
}

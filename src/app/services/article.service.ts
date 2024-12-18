import { inject, Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  $axios = inject(UrlService).$axios;

  constructor() {}
  async getArticlePreviews(): Promise<
    Pick<Article, '_id' | 'title' | 'createdAt'>[]
  > {
    const res = await this.$axios.get('/articles/preview');
    return res.data;
  }
  async getArticle(id: string): Promise<Article> {
    const res = await this.$axios.get(`/articles/article/${id}`);
    return res.data;
  }
  async getLatestArticle() {
    const res = await this.$axios.get(`/articles/latest`);
    return res.data;
  }
  async addArticle(payload: Partial<Article>): Promise<Article> {
    const res = await this.$axios.post(`/articles`, payload);
    return res.data;
  }
}

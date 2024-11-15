import { inject, Injectable } from '@angular/core';
import { Topic } from '../interfaces/topic';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  private $axios = inject(UrlService).$axios;
  constructor() {}
  async getTopics() {
    const res = await this.$axios.get(`/topics`);
    return res.data;
  }
  async addTopic(quote: Partial<Topic>): Promise<Topic> {
    const req = await this.$axios.post('/topics', quote);
    return req.data;
  }
  async deleteTopic(id: string) {
    const req = await this.$axios.delete(`/topics/${id}`);
    return req.data;
  }
}

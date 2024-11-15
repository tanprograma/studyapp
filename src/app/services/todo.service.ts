import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { UrlService } from './url.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  platformID = inject(PLATFORM_ID);
  private $axios = inject(UrlService).$axios;
  constructor() {}
  async getTodos() {
    if (isPlatformBrowser(this.platformID)) {
      const userID = JSON.stringify(sessionStorage.getItem('user') as string);
      const res = await this.$axios.get(`/todos?user=${userID}`);
      return res.data;
    } else {
      return [];
    }
  }
  async addTodo(todo: Partial<Todo>): Promise<Todo> {
    const req = await this.$axios.post('/todos', todo);
    return req.data;
  }
  async deleteTodo(id: string) {
    const req = await this.$axios.delete(`/todos/${id}`);
    return req.data;
  }
  async updateTodo(id: string, payload: Partial<Todo>) {
    const req = await this.$axios.patch('/todos/id', payload);
    return req.data;
  }
}

import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { User } from '../interfaces/user';
import { UrlService } from './url.service';
import { Router } from '@angular/router';
import { BOOK_STORE } from '../store/book.store';
import { SUBJECT_STORE } from '../store/subject.store';
import { TODO_STORE } from '../store/todo.store';
import { TOPIC_STORE } from '../store/topic.store';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  router = inject(Router);
  $axios = inject(UrlService).$axios;
  bookStore = inject(BOOK_STORE);
  subjectStore = inject(SUBJECT_STORE);
  todoStore = inject(TODO_STORE);
  topicStore = inject(TOPIC_STORE);
  platformID = inject(PLATFORM_ID);
  constructor() {}
  isLoggedIn() {
    if (isPlatformBrowser(this.platformID)) {
      const user = sessionStorage.getItem('user');

      return user;
    }
    return null;
  }
  setUserSession(user: any) {
    if (isPlatformBrowser(this.platformID)) {
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  }
  async login(
    payload: Partial<User>
  ): Promise<{ status: boolean; data: unknown }> {
    const user = await this.$axios.post('/users/login', payload);
    return user.data;
  }
  logOut() {
    if (isPlatformBrowser(this.platformID)) {
      sessionStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}

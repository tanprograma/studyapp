import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Subject } from '../interfaces/subject';
import { Book } from '../interfaces/book';
import { Topic } from '../interfaces/topic';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  platFormID = inject(PLATFORM_ID);
  constructor() {}
  isBrowser() {
    return isPlatformBrowser(this.platFormID);
  }
  setSession(item: {
    booted: boolean;
    books: Book[];
    topics: Topic[];
    subjects: Subject[];
  }) {
    if (this.isBrowser()) {
      sessionStorage.setItem(`booted`, JSON.stringify(item['booted']));
      sessionStorage.setItem(`books`, JSON.stringify(item['books']));
      sessionStorage.setItem(`topics`, JSON.stringify(item['topics']));
      sessionStorage.setItem(`subjects`, JSON.stringify(item['subjects']));
    }
  }
  getSession() {}
}

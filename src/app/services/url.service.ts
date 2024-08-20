import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  document = inject(DOCUMENT);
  BASE_URL =
    environment.env == 'development'
      ? environment.origin
      : this.document.location.origin;
  SUBJECT_API = `${this.BASE_URL}/api/subjects`;

  TOPIC_API = `${this.BASE_URL}/api/topics`;

  SUBTOPIC_API = `${this.BASE_URL}/api/subtopics`;

  NOTE_API = `${this.BASE_URL}/api/notes`;
  QUESTION_API = `${this.BASE_URL}/api/questions`;
  QUOTE_API = `${this.BASE_URL}/api/quotes`;
  TODO_API = `${this.BASE_URL}/api/todos`;
  PLAN_API = `${this.BASE_URL}/api/plans`;

  constructor() {}
}

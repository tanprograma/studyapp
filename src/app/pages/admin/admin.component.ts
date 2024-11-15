import {
  APP_ID,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CreateSubjectsComponent } from '../../components/create-subjects/create-subjects.component';
import { CreateTopicsComponent } from '../../components/create-topics/create-topics.component';
import { CreateBooksComponent } from '../../components/create-books/create-books.component';
import { CreateQuotesComponent } from '../../components/create-quotes/create-quotes.component';
import { CreateTodosComponent } from '../../components/create-todos/create-todos.component';
import { CreatePlansComponent } from '../../components/create-plans/create-plans.component';
import { CreateProjectsComponent } from '../../components/create-projects/create-projects.component';
import { CreateNotesComponent } from '../../components/create-notes/create-notes.component';
import { CreateExamComponent } from '../../components/create-exam/create-exam.component';
import { CreateQuestionsComponent } from '../../components/create-questions/create-questions.component';
import { CreateArticleComponent } from '../../components/create-article/create-article.component';
import { BOOK_STORE } from '../../store/book.store';
import { SUBJECT_STORE } from '../../store/subject.store';
import { TOPIC_STORE } from '../../store/topic.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { APP_STATE } from '../../store/app.store';
import { isPlatformBrowser, JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { CreateStudyquestionsComponent } from '../../components/create-studyquestions/create-studyquestions.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MatTabsModule,
    CreateSubjectsComponent,
    CreateTopicsComponent,
    CreateBooksComponent,
    CreateQuotesComponent,
    CreateTodosComponent,
    CreatePlansComponent,
    CreateProjectsComponent,
    CreateNotesComponent,
    CreateQuestionsComponent,
    CreateArticleComponent,
    MatProgressSpinnerModule,
    JsonPipe,
    CreateStudyquestionsComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
  appID = inject(PLATFORM_ID);
  appStore = inject(APP_STATE);
  router = inject(Router);
  constructor() {}
  ngOnInit(): void {
    // console.log(this.appStore.isLoggedIn());
    this.bootComponent()
      .then(() => console.log('component booted'))
      .catch((err) => console.error(err.message));
  }
  async bootComponent() {
    if (isPlatformBrowser(this.appID) && !this.appStore.initialized()) {
      this.appStore.setState(true);
      this.appStore.setLoadState(true);
      await this.appStore.initializeData();
      this.appStore.setLoadState(false);
    }
  }
}

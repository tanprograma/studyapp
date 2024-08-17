import { Routes } from '@angular/router';
import { CreateNotesComponent } from './pages/create-notes/create-notes.component';
import { CreateQuestionsComponent } from './pages/create-questions/create-questions.component';
import { CreateQuotesComponent } from './pages/create-quotes/create-quotes.component';
import { CreateSubjectComponent } from './pages/create-subject/create-subject.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainComponent } from './pages/main/main.component';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { QuotesComponent } from './pages/quotes/quotes.component';
import { CreateTopicComponent } from './pages/create-topic/create-topic.component';
import { CreateSubtopicComponent } from './pages/create-subtopic/create-subtopic.component';

export const routes: Routes = [
  //   { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'notes', component: NotesPageComponent },
      { path: 'quotes', component: QuotesComponent },
      { path: 'questions', component: QuestionsComponent },
      { path: 'create-quotes', component: CreateQuotesComponent },
      { path: 'create-notes', component: CreateNotesComponent },
      { path: 'create-questions', component: CreateQuestionsComponent },
      { path: 'create-subjects', component: CreateSubjectComponent },
      { path: 'create-topics', component: CreateTopicComponent },
      { path: 'create-subtopics', component: CreateSubtopicComponent },
      { path: 'login', component: LoginPageComponent },
    ],
  },
];

import { Routes } from '@angular/router';
import { MainComponent } from '../pages/main/main.component';
import { LoginPageComponent } from '../pages/login-page/login-page.component';
import { NotesPageComponent } from '../pages/notes-page/notes-page.component';
import { QuotesComponent } from '../pages/quotes/quotes.component';
import { QuestionsComponent } from '../pages/questions/questions.component';
import { CreateQuotesComponent } from '../pages/create-quotes/create-quotes.component';
import { CreateNotesComponent } from '../pages/create-notes/create-notes.component';
import { CreateQuestionsComponent } from '../pages/create-questions/create-questions.component';
import { CreateSubjectComponent } from '../pages/create-subject/create-subject.component';
const route: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: MainComponent,
    children: [
      { path: ':userid/notes', component: NotesPageComponent },
      { path: ':userid/quotes', component: QuotesComponent },
      { path: ':userid/questions', component: QuestionsComponent },
      { path: ':userid/create-quotes', component: CreateQuotesComponent },
      { path: ':userid/create-notes', component: CreateNotesComponent },
      { path: ':userid/create-questions', component: CreateQuestionsComponent },
      { path: ':userid/create-subjects', component: CreateSubjectComponent },
      { path: 'login', component: LoginPageComponent },
    ],
  },
];
export default route;

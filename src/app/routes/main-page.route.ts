import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { NotesComponent } from '../pages/notes/notes.component';
import { QuotesComponent } from '../pages/quotes/quotes.component';
import { QuestionsComponent } from '../pages/questions/questions.component';
import { TodoComponent } from '../pages/todo/todo.component';
import { ArticlesComponent } from '../pages/articles/articles.component';
import { ProjectsComponent } from '../pages/projects/projects.component';
import { PlansComponent } from '../pages/plans/plans.component';
import { AdminComponent } from '../pages/admin/admin.component';
const route: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'quotes', component: QuotesComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'todos', component: TodoComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'plans', component: PlansComponent },
  { path: 'admin', component: AdminComponent },
  // { path: ':userid/create-questions', component: CreateQuestionsComponent },
  // { path: ':userid/create-subjects', component: CreateSubjectComponent },
];
export default route;

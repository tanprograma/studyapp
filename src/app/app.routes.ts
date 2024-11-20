import { Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { LoginComponent } from './pages/login/login.component';
import { NotesComponent } from './pages/notes/notes.component';
import { PlansComponent } from './pages/plans/plans.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { QuotesComponent } from './pages/quotes/quotes.component';
import { TodoComponent } from './pages/todo/todo.component';
import { CreateExamComponent } from './components/create-exam/create-exam.component';
import { ExamsComponent } from './pages/exams/exams.component';
import { ArticlesViewComponent } from './components/articles-view/articles-view.component';
import { BootComponent } from './components/boot/boot.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { StudyQuestionsComponent } from './pages/study-questions/study-questions.component';
import { JournalComponent } from './pages/journal/journal.component';

export const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'quotes', component: QuotesComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'todos', component: TodoComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'plans', component: PlansComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'journal', component: JournalComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'articles/:id', component: ArticlesViewComponent },

  { path: 'boot', component: BootComponent },
  { path: 'admin', component: AdminComponent },

  { path: 'study', component: StudyQuestionsComponent },
  { path: 'exams', component: ExamsComponent },

  { path: 'exams/:id', component: CreateExamComponent },
  { path: '**', component: NotFoundComponent },

  // s{ path: ':userid/create-questions', component: CreateQuestionsComponent },
  // { path: ':userid/create-subjects', component: CreateSubjectComponent },
];

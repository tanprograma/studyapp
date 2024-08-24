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
import { TodoComponent } from './pages/todo/todo.component';
import { CreateTodoComponent } from './pages/create-todo/create-todo.component';
import { CreatePlanComponent } from './pages/create-plan/create-plan.component';
import { PlanComponent } from './pages/plan/plan.component';
import { CreateArticleComponent } from './pages/create-article/create-article.component';
import { ArticleComponent } from './pages/article/article.component';
import { ManageArticlesComponent } from './pages/manage-articles/manage-articles.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/todos' },
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'notes', component: NotesPageComponent },
      { path: 'quotes', component: QuotesComponent },
      { path: 'questions', component: QuestionsComponent },
      { path: 'todos', component: TodoComponent },
      { path: 'plans', component: PlanComponent },
      { path: 'articles', component: ArticleComponent },
      { path: 'manage-articles', component: ManageArticlesComponent },
      { path: 'create-todos', component: CreateTodoComponent },
      { path: 'create-plans', component: CreatePlanComponent },
      { path: 'create-quotes', component: CreateQuotesComponent },
      { path: 'create-notes', component: CreateNotesComponent },
      { path: 'create-articles', component: CreateArticleComponent },
      { path: 'create-questions', component: CreateQuestionsComponent },
      { path: 'create-subjects', component: CreateSubjectComponent },
      { path: 'create-topics', component: CreateTopicComponent },
      { path: 'create-subtopics', component: CreateSubtopicComponent },
      { path: 'login', component: LoginPageComponent },
    ],
  },
];

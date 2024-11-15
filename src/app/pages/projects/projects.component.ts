import { Component, effect, inject, viewChild } from '@angular/core';

import {
  MatButtonToggleGroup,
  MatButtonToggleChange,
  MatButtonToggle,
} from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TodoListUpdate } from '../../components/todo-list/todo-list.component';
import { TodoListComponent } from '../../components/todo-list/todo-list.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { FilterQuery } from 'mongoose';
import { PROJECT_STORE } from '../../store/project.store';
import { USER_STATE } from '../../store/user.store';
import { User } from '../../interfaces/user';
import { Action } from '../../interfaces/action';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    TodoListComponent,
    MatFormFieldModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatProgressSpinner,
    MatInputModule,
  ],
  providers: [PROJECT_STORE],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  store = inject(PROJECT_STORE);
  userState = inject(USER_STATE);
  filter = viewChild.required(MatButtonToggleGroup);
  constructor() {
    effect(() => {
      const filter = this.filter();
      filter.value = this.store.filter();
    });
  }
  ngOnInit(): void {
    this.getPlans().then((res) => {
      console.log('loaded Plans');
    });
  }
  async getPlans() {
    await this.store.getProjects(this.getUserID());
  }
  async addProject(title: string) {
    await this.store.addProject({ title, author: this.getUserID() });
  }
  getUserID() {
    return (this.userState.user() as User)._id;
  }
  async updateList(action: Action) {
    switch (action.type) {
      case 'delete':
        await this.store.deleteProject(action.payload.id as string);
        break;

      case 'update':
        await this.store.updateProject(action.payload.id as string, {
          title: action.payload.title as string,
        });
        break;

      default:
        break;
    }
  }
  onFilterProject(filter: MatButtonToggleChange) {
    const value = filter.value as 'all' | 'completed' | 'pending';

    this.store.filterProjects(value);
  }
}

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
import { LoadIndicatorComponent } from '../../components/load-indicator/load-indicator.component';

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
    LoadIndicatorComponent,
  ],
  providers: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  store = inject(PROJECT_STORE);

  filter = viewChild.required(MatButtonToggleGroup);
  constructor() {
    effect(() => {
      const filter = this.filter();
      filter.value = this.store.filter();
    });
  }
  ngOnInit(): void {
    this.store.getProjects().then((res) => {
      console.log('loaded todos');
    });
  }

  async updateList(action: Action) {
    switch (action.type) {
      case 'delete':
        await this.store.deleteProject(action.payload.id as string);
        break;

      case 'update':
        await this.store.toggleProject(action.payload.id as string);
        break;

      default:
        break;
    }
  }
  onFilterTodo(filter: MatButtonToggleChange) {
    const value = filter.value as 'all' | 'pending' | 'completed';

    this.store.filterProjects(value);
  }
}

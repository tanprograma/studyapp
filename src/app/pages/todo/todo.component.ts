import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { NgStyle } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatButtonToggle,
  MatButtonToggleChange,
  MatButtonToggleGroup,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import {
  MatListModule,
  MatListOption,
  MatSelectionListChange,
} from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Todo } from '../../interfaces/todo';
import {
  TodoListComponent,
  TodoListUpdate,
} from '../../components/todo-list/todo-list.component';
import { Action } from '../../interfaces/action';
import { FilterQuery } from 'mongoose';
import { TODO_STORE } from '../../store/todo.store';
import { LoadIndicatorComponent } from '../../components/load-indicator/load-indicator.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    NgStyle,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonToggleModule,
    MatListModule,
    MatProgressSpinnerModule,
    TodoListComponent,
    LoadIndicatorComponent,
  ],
  providers: [TODO_STORE],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnInit {
  store = inject(TODO_STORE);

  filter = viewChild.required(MatButtonToggleGroup);
  constructor() {
    effect(() => {
      const filter = this.filter();
      filter.value = this.store.filter();
    });
  }
  ngOnInit(): void {
    this.store.getTodos().then((res) => {
      console.log('loaded todos');
    });
  }

  async updateList(action: Action) {
    switch (action.type) {
      case 'delete':
        await this.store.deleteTodo(action.payload.id as string);
        break;

      case 'update':
        await this.store.toggleTodo(action.payload.id as string);
        break;

      default:
        break;
    }
  }
  onFilterTodo(filter: MatButtonToggleChange) {
    const value = filter.value as 'all' | 'pending' | 'completed';

    this.store.filterTodos(value);
  }
}

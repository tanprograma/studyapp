import { Component, effect, inject, viewChild } from '@angular/core';

import {
  MatButtonToggleModule,
  MatButtonToggleGroup,
  MatButtonToggleChange,
} from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {
  TodoListComponent,
  TodoListUpdate,
} from '../../components/todo-list/todo-list.component';
import { MatIcon } from '@angular/material/icon';
import { NgStyle } from '@angular/common';
import { PLAN_STORE } from '../../store/plan.store';
import { USER_STATE } from '../../store/user.store';
import { User } from '../../interfaces/user';
import { Action } from '../../interfaces/action';
import { LoadIndicatorComponent } from '../../components/load-indicator/load-indicator.component';
import { TODO_STORE } from '../../store/todo.store';
@Component({
  selector: 'app-plans',
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
  providers: [],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss',
})
export class PlansComponent {
  store = inject(PLAN_STORE);

  filter = viewChild.required(MatButtonToggleGroup);
  constructor() {
    effect(() => {
      const filter = this.filter();
      filter.value = this.store.filter();
    });
  }
  ngOnInit(): void {
    this.store.getPlans().then((res) => {
      console.log('loaded plans');
    });
  }

  async updateList(action: Action) {
    switch (action.type) {
      case 'delete':
        await this.store.deletePlan(action.payload.id as string);
        break;

      case 'update':
        await this.store.togglePlan(action.payload.id as string);
        break;

      default:
        break;
    }
  }
  onFilterTodo(filter: MatButtonToggleChange) {
    const value = filter.value as 'all' | 'pending' | 'completed';

    this.store.filterPlans(value);
  }
}

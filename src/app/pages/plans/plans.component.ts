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
  ],
  providers: [PLAN_STORE],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss',
})
export class PlansComponent {
  store = inject(PLAN_STORE);
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
    await this.store.getPlans(this.getUserID());
  }
  async onAddPlan(title: string) {
    await this.store.addPlan({ title, author: this.getUserID() });
  }
  getUserID() {
    return (this.userState.user() as User)._id;
  }
  async updateList(action: Action) {
    switch (action.type) {
      case 'delete':
        await this.store.deletePlan(action.payload.id as string);
        break;

      case 'update':
        await this.store.updatePlan(action.payload.id as string, {
          title: action.payload.title as string,
        });
        break;

      default:
        break;
    }
  }
  onFilterPlan(filter: MatButtonToggleChange) {
    const value = filter.value as 'all' | 'completed' | 'pending';

    this.store.filterPlans(value);
  }
  // async onDeletePlan(event: MouseEvent, id?: string) {
  //   event.stopPropagation();
  //   await this.store.deletePlan(id);
  // }

  // async updatePlan(completed: boolean, id: string) {

  //   // console.log({ completed, id });
  //   // console.log(this.store.Plans());
  //   await this.store.updatePlan(completed, id);
  // }
}

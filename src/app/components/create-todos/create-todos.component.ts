import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CreatedComponent } from '../created/created.component';
import { TODO_STORE } from '../../store/todo.store';
import { LoadIndicatorComponent } from '../load-indicator/load-indicator.component';

@Component({
  selector: 'create-todos',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CreatedComponent,
    LoadIndicatorComponent,
  ],
  templateUrl: './create-todos.component.html',
  styleUrl: './create-todos.component.scss',
})
export class CreateTodosComponent {
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    todo: ['', Validators.required],
  });
  store = inject(TODO_STORE);
  async createItem() {
    if (this.form.valid) {
      await this.store.addTodo({
        title: this.form.value.todo ?? '',
      });
      this.clearForm();
    } else {
      return;
    }
  }
  clearForm() {
    this.form.patchValue({ todo: '' });
  }
  async deleteItem(id: string) {
    await this.store.deleteTodo(id);
  }
}

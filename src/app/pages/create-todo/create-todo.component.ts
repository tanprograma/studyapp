import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.scss',
})
export class CreateTodoComponent {
  todoService = inject(TodoService);
  http = inject(HttpService);
  items: Todo[] = [];
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    todo: ['', Validators.required],
  });
  save() {
    this.todoService
      .post({
        value: this.form.value.todo ?? '',
      })
      .subscribe((result) => {
        this.items.push(result);
      });
    this.reset();
  }
  reset() {
    this.form.patchValue({
      todo: '',
    });
  }
}

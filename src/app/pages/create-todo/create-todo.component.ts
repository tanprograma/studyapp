import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent],
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
  loading = false;
  save() {
    this.loading = true;
    this.todoService
      .post({
        value: this.form.value.todo ?? '',
      })
      .subscribe((result) => {
        if (result != undefined) {
          this.items.push(result);
        }
        this.loading = false;
      });
    this.reset();
  }
  reset() {
    this.form.patchValue({
      todo: '',
    });
  }
}

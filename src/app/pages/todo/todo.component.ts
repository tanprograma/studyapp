import { Component, inject } from '@angular/core';
import { Todo } from '../../interfaces/todo';
import { TodoService } from '../../services/todo.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '../../components/loader/loader.component';
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  todoService = inject(TodoService);
  all_Items: Todo[] = [];
  loading = true;

  items: Todo[] = [];
  ngOnInit(): void {
    this.loading = true;
    this.todoService.get().subscribe((res) => {
      this.all_Items = this.items = res;
      this.loading = false;
    });
  }
  search(e: Event) {
    const target = e.target as HTMLInputElement;

    this.items = this.all_Items.filter((item) => {
      return (
        new Date(item.createdAt as string).toLocaleDateString() ==
        new Date(target.value).toLocaleDateString()
      );
    });
  }
  getAll() {
    this.items = this.all_Items;
  }
  complete(id: string | undefined) {
    this.todoService.complete({ _id: id as string }).subscribe((res) => {
      this.items = this.items.map((item) => {
        return item._id == res._id ? { ...item, completed: true } : item;
      });
    });
  }
}

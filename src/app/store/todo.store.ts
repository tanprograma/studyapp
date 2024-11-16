import {
  patchState,
  signalStore,
  withMethods,
  withState,
  withComputed,
} from '@ngrx/signals';

import { computed, inject } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { TodoService } from '../services/todo.service';
import { Created } from '../components/created/created.component';
import { APP_STATE } from './app.store';

type State = {
  todos: Todo[];
  filter: 'all' | 'completed' | 'pending';
  loading: boolean;
  createdTodos: Created[];
};
const initialState: State = {
  todos: [],
  filter: 'all',
  loading: false,
  createdTodos: [],
};
export const TODO_STORE = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ todos, filter }) => ({
    filteredTodos: computed(() => {
      switch (filter()) {
        case 'all':
          return todos();

        case 'pending':
          return todos().filter((todo: Todo) => !todo.completed);

        case 'completed':
          return todos().filter((todo: Todo) => todo.completed);

        default:
          throw new Error('unknown filter');
      }
    }),
  })),
  withMethods(
    (
      store,
      todoService = inject(TodoService),
      appStore = inject(APP_STATE)
    ) => ({
      async getTodos() {
        patchState(store, { loading: true });
        const todos = await todoService.getTodos();
        patchState(store, { todos: todos, loading: false });
      },
      async addTodo(payload: Partial<Todo>) {
        patchState(store, { loading: true });
        const todo = await todoService.addTodo(payload);
        patchState(store, ({ todos }) => ({
          todos: [todo, ...todos],
          loading: false,
        }));
      },
      async deleteTodo(id: string) {
        patchState(store, { loading: true });
        const res = await todoService.deleteTodo(id);
        if (res) {
          patchState(store, ({ todos }) => ({
            todos: todos.filter((todo) => todo._id != id),
          }));
        }
        patchState(store, { loading: false });
      },
      async updateTodo(id: string, completed: boolean) {
        patchState(store, { loading: true });
        const res = await todoService.updateTodo(id, { completed });
        patchState(store, ({ todos }) => ({
          todos: todos.map((todo) => (todo._id == id ? res : todo)),
          loading: false,
        }));
      },
      async toggleTodo(id: string) {
        patchState(store, { loading: true });
        const res = await todoService.toggleTodo(id);
        if (res) {
          patchState(store, ({ todos }) => ({
            todos: todos.map((todo) =>
              todo._id == id ? { ...todo, completed: !todo.completed } : todo
            ),
            loading: false,
          }));
        } else {
          patchState(store, { loading: false });
        }
      },
      filterTodos(filter: 'all' | 'pending' | 'completed') {
        patchState(store, { filter: filter });
      },
    })
  )
);

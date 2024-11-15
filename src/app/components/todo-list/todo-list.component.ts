import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../interfaces/todo';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { NgStyle } from '@angular/common';
import { Action } from '../../interfaces/action';
export type TodoListUpdate = { type: 'update' | 'delete'; id: string };
@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [MatListModule, MatIcon, NgStyle],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  @Input() items!: { _id: string; completed: boolean; title: string }[];
  @Output() onUpdate = new EventEmitter<Action>();

  onToggleTodo(id: string) {
    this.onUpdate.emit({ type: 'update', payload: { id } });
  }
  onDeleteTodo(event: MouseEvent, id: string) {
    event.stopPropagation();
    this.onUpdate.emit({ type: 'delete', payload: { id } });
  }
}

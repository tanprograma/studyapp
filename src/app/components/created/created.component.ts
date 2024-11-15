import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
export type Created = {
  _id: string;
  item: string;
};
@Component({
  selector: 'created',
  standalone: true,
  imports: [MatListModule, MatIconModule],
  templateUrl: './created.component.html',
  styleUrl: './created.component.scss',
})
export class CreatedComponent {
  @Input() items!: Created[];
  @Output() onDelete = new EventEmitter<string>();
  deleteItem(event: MouseEvent, id: string) {
    event.stopPropagation();
    this.onDelete.emit(id);
  }
}

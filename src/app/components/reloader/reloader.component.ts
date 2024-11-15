import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'reloader',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './reloader.component.html',
  styleUrl: './reloader.component.scss',
})
export class ReloaderComponent {
  @Input() items!: string | number;
  @Output() onClick = new EventEmitter();
  clicked() {
    this.onClick.emit();
  }
}

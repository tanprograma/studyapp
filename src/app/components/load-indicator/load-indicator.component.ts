import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'load-indicator',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './load-indicator.component.html',
  styleUrl: './load-indicator.component.scss',
})
export class LoadIndicatorComponent {
  @Input() message?: string;
}

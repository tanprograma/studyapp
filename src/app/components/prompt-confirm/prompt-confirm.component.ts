import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'prompt-confirm',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './prompt-confirm.component.html',
  styleUrl: './prompt-confirm.component.scss',
})
export class PromptConfirmComponent {
  @Input() message?: string;
  @Output() onConfirm = new EventEmitter<boolean>();
  loader = faSpinner;
  cancel() {
    this.onConfirm.emit(false);
  }
  confirm() {
    this.onConfirm.emit(true);
  }
}

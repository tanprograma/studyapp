import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { Choice, Result } from '../../interfaces/exam';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'question-take',
  standalone: true,
  imports: [MatRadioModule, MatButtonModule],
  templateUrl: './question-take.component.html',
  styleUrl: './question-take.component.scss',
})
export class QuestionTakeComponent {
  @Input() item!: Partial<Choice>;
  @Output() onSelectOption = new EventEmitter<Pick<Choice, 'option' | 'sn'>>();
  more: boolean = false;
  readonly choices: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
  ];
  readonly shortChoices = this.choices.filter((choice, index) => index < 5);
  toggleMore() {
    this.more = !this.more;
  }
  selectOption(e: MatRadioChange, option: string) {
    this.onSelectOption.emit({ option, sn: this.item.sn as number });
  }
}

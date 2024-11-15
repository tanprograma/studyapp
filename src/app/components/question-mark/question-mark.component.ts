import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRadioModule, MatRadioChange } from '@angular/material/radio';
import { Choice } from '../../interfaces/exam';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'question-mark',
  standalone: true,
  imports: [MatRadioModule, MatButtonModule],
  templateUrl: './question-mark.component.html',
  styleUrl: './question-mark.component.scss',
})
export class QuestionMarkComponent {
  @Input() item!: Partial<Choice>;
  @Output() onSelectOption = new EventEmitter<Partial<Choice>>();
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

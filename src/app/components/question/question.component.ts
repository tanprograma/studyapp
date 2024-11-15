import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { Result } from '../../interfaces/exam';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'question',
  standalone: true,
  imports: [MatRadioModule, MatButtonModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent {
  @Input() item!: Partial<Result>;
  @Output() onSelectOption = new EventEmitter<Partial<Result>>();
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

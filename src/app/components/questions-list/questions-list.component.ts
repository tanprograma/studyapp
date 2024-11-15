import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestionComponent } from '../question/question.component';
import { MatListModule } from '@angular/material/list';
import { Choice, Exam, ExamResult, Result } from '../../interfaces/exam';

@Component({
  selector: 'questions-list',
  standalone: true,
  imports: [QuestionComponent, MatListModule],
  templateUrl: './questions-list.component.html',
  styleUrl: './questions-list.component.scss',
})
export class QuestionsListComponent {
  @Input() exam!: Choice[] | Result[];
  @Output() onSelectOption = new EventEmitter<Partial<Result>>();
  selectOption(e: Partial<Choice>) {
    this.onSelectOption.emit(e);
  }
}

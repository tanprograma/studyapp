import { Component, inject } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../interfaces/question';
import { NotecreatorComponent } from '../../components/notecreator/notecreator.component';

@Component({
  selector: 'app-create-questions',
  standalone: true,
  imports: [NotecreatorComponent],
  templateUrl: './create-questions.component.html',
  styleUrl: './create-questions.component.scss',
})
export class CreateQuestionsComponent {
  questionService = inject(QuestionService);

  items: Question[] = [];

  ngOnInit(): void {}
  save(value: Question) {
    this.questionService.post(value).subscribe((result) => {
      this.items.push(result);
    });
  }
}

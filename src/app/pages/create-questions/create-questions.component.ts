import { Component, inject } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../interfaces/question';
import { NotecreatorComponent } from '../../components/notecreator/notecreator.component';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-create-questions',
  standalone: true,
  imports: [NotecreatorComponent, LoaderComponent],
  templateUrl: './create-questions.component.html',
  styleUrl: './create-questions.component.scss',
})
export class CreateQuestionsComponent {
  questionService = inject(QuestionService);

  items: Question[] = [];
  loading = false;
  ngOnInit(): void {}
  save(value: Question) {
    this.loading = true;
    this.questionService.post(value).subscribe((result) => {
      if (result != undefined) {
        this.items.push(result);
      }
      this.loading = false;
    });
  }
}

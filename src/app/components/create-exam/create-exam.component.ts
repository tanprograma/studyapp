import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Choice, Result } from '../../interfaces/exam';

import { CreatedComponent } from '../created/created.component';
import { QuestionsListComponent } from '../questions-list/questions-list.component';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { QuestionTakeComponent } from '../question-take/question-take.component';
import { QuestionMarkComponent } from '../question-mark/question-mark.component';
import { MatButtonModule } from '@angular/material/button';
import { EXAM_STORE } from '../../store/exam.store';
import { UrlService } from '../../services/url.service';
import { APP_STATE } from '../../store/app.store';

@Component({
  selector: 'create-exam',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CreatedComponent,
    QuestionsListComponent,
    QuestionTakeComponent,
    QuestionMarkComponent,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './create-exam.component.html',
  styleUrl: './create-exam.component.scss',
})
export class CreateExamComponent implements OnInit {
  $axios = inject(UrlService).$axios;
  formBuilder = inject(FormBuilder);
  appStore = inject(APP_STATE);
  route = inject(ActivatedRoute);
  markView = false;
  form = this.formBuilder.group({
    choices: [0, Validators.required],
  });
  store = inject(EXAM_STORE);

  ngOnInit(): void {
    this.getExam().then((res) => console.log('gotten exams'));
  }
  async getExam() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!!id) {
      this.appStore.setLoadState(true);
      await this.store.getExam(id);
      this.appStore.setLoadState(false);
    }
  }

  selectChoice(choice: Pick<Choice, 'option' | 'sn'>) {
    this.store.selectExamChoice(choice);
  }

  mark() {
    this.markView = true;
  }

  async saveExam() {
    await this.store.saveExamResults();
  }
}

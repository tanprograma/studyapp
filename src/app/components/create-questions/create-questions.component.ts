import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CreatedComponent } from '../created/created.component';
import { Choice, Result } from '../../interfaces/exam';
import { QuestionsListComponent } from '../questions-list/questions-list.component';
import { EXAM_STORE } from '../../store/exam.store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { LoadIndicatorComponent } from '../load-indicator/load-indicator.component';
import { APP_STATE } from '../../store/app.store';

@Component({
  selector: 'create-questions',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CreatedComponent,
    QuestionsListComponent,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    LoadIndicatorComponent,
  ],
  templateUrl: './create-questions.component.html',
  styleUrl: './create-questions.component.scss',
})
export class CreateQuestionsComponent {
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    choices: [0, Validators.required],
    subject: ['', Validators.required],
    book: ['', Validators.required],
    topic: ['', Validators.required],
  });
  appStore = inject(APP_STATE);
  store = inject(EXAM_STORE);
  questions: Choice[] = [];

  createQuestions() {
    const qns = this.form.value.choices ?? 0;
    for (let i = 1; i <= qns; i++) {
      this.questions.push({ sn: i, option: '', selected: '' });
    }
    // if (this.form.valid) {
    //   await this.store.createProject({
    //     choices: this.form.value.choices ?? 0,
    //   });
    //   this.clearForm();
    // } else {
    //   return;
    // }
  }
  selectChoice(choice: Partial<Result>) {
    this.questions = this.questions.map((qn) => {
      return qn.sn == choice.sn ? (choice as Choice) : qn;
    });
  }
  async createExam() {
    await this.store.addExam(this.prepareExam());
    this.appStore.setSubjectFilter('');
  }
  private prepareExam() {
    return {
      questions: this.questions,
      topic: this.form.value.topic ?? '',
      subject: this.form.value.subject ?? '',
      book: this.form.value.book ?? '',
    };
  }
  clearForm() {
    this.form.patchValue({ choices: 0 });
  }
  // async deleteItem(id: string) {
  //   await this.store.deletePlan(id);
  // }
}

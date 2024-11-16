import { Component, computed, inject, signal } from '@angular/core';
import { STUDY_STORE } from '../../store/studqn.store';
import { StudyQuestion } from '../../interfaces/exam';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { APP_STATE } from '../../store/app.store';
import { CreatedComponent } from '../created/created.component';
import { LoadIndicatorComponent } from '../load-indicator/load-indicator.component';
import { QuestionsListComponent } from '../questions-list/questions-list.component';

@Component({
  selector: 'create-studyquestions',
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
  templateUrl: './create-studyquestions.component.html',
  styleUrl: './create-studyquestions.component.scss',
})
export class CreateStudyquestionsComponent {
  formBuilder = inject(FormBuilder);
  subject = signal('');

  form = this.formBuilder.group({
    subject: ['', Validators.required],
    studyQn: ['', Validators.required],
    topic: ['', Validators.required],
  });
  appStore = inject(APP_STATE);
  store = inject(STUDY_STORE);
  questions: { item: string; _id: string }[] = [];
  setSubject(v: string) {
    this.appStore.setSubjectFilter(v);
  }
  removeStudyQn(id: string) {
    this.questions = this.questions.filter((note) => note._id != id);
  }
  createStudyQn() {
    this.questions.push({
      item: this.form.value.studyQn ?? '',
      _id: Math.random().toString(36).substring(2, 9),
    });
    this.clearForm();
  }

  async addStudyQn() {
    await this.store.addQuestion(this.prepareQuestions());

    this.questions = [];
  }
  prepareQuestions(): Partial<StudyQuestion>[] {
    // const author = this.appStore.user()?._id ?? '';

    return this.questions.map((qn) => ({
      subject: this.form.value.subject ?? '',
      title: qn.item ?? '',
      topic: this.form.value.topic ?? '',
      // author: author,
    }));
  }
  clearForm() {
    this.form.patchValue({ studyQn: '' });
  }
}

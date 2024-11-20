import { Component, inject, OnInit, signal } from '@angular/core';
import { STUDY_STORE } from '../../store/studqn.store';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { APP_STATE } from '../../store/app.store';

@Component({
  selector: 'study-questions',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './study-questions.component.html',
  styleUrl: './study-questions.component.scss',
})
export class StudyQuestionsComponent {
  formBuilder = inject(FormBuilder);
  appState = inject(APP_STATE);
  store = inject(STUDY_STORE);
  subject = signal('string');

  form = this.formBuilder.group({
    topic: ['', Validators.required],
  });
  ngOnInit(): void {}
  setSubject(v: string) {
    this.appState.setSubjectFilter(v);
  }
  async getStudyQuestions() {
    await this.store.getQuestions({ topic: this.form.value.topic ?? '' });
  }
}

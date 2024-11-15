import {
  Component,
  computed,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { CreatedComponent } from '../created/created.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { TOPIC_STORE } from '../../store/topic.store';
import { SUBJECT_STORE } from '../../store/subject.store';
import { APP_STATE } from '../../store/app.store';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { JsonPipe } from '@angular/common';
import { Subject } from '../../interfaces/subject';
import { Topic } from '../../interfaces/topic';
import { LoadIndicatorComponent } from '../load-indicator/load-indicator.component';

@Component({
  selector: 'create-topics',
  standalone: true,
  imports: [
    CreatedComponent,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    JsonPipe,
    LoadIndicatorComponent,
  ],
  templateUrl: './create-topics.component.html',
  styleUrl: './create-topics.component.scss',
})
export class CreateTopicsComponent implements OnInit {
  // @Input() data!: { subjects: Subject[]; topics: Topic[] };
  formBuilder = inject(FormBuilder);
  appStore = inject(APP_STATE);
  store = inject(TOPIC_STORE);
  form = this.formBuilder.group({
    topic: ['', Validators.required],
    subject: ['', Validators.required],
  });
  subject = signal('');
  topics = computed(() => {
    switch (this.subject()) {
      case '':
        return [];

      default:
        return this.appStore
          .topics()
          .filter((topic) => topic.subject == this.subject());
    }
  });

  ngOnInit(): void {}
  setSubject(v: string) {
    this.subject.set(v);
  }
  async createTopic() {
    if (this.form.valid) {
      await this.store.addTopic({
        name: this.form.value.topic ?? '',
        subject: this.form.value.subject ?? '',
      });
      this.clearForm();
    } else {
      return;
    }
  }
  clearForm() {
    this.form.patchValue({ topic: '' });
  }
  async deleteItem(id: string) {
    await this.store.deleteTopic(id);
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { TopicService } from '../../services/topic.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { HttpService } from '../../services/http.service';
import { Topic } from '../../interfaces/topic';
import { SubjectService } from '../../services/subject.service';
import { Subject } from '../../interfaces/subject';
import { LoaderComponent } from '../../components/loader/loader.component';
import { PromptConfirmComponent } from '../../components/prompt-confirm/prompt-confirm.component';

@Component({
  selector: 'app-create-topic',
  standalone: true,
  imports: [ReactiveFormsModule, PromptConfirmComponent],
  templateUrl: './create-topic.component.html',
  styleUrl: './create-topic.component.scss',
})
export class CreateTopicComponent implements OnInit {
  loading = false;
  topicService = inject(TopicService);
  subjectService = inject(SubjectService);
  http = inject(HttpService);
  items: Topic[] = [];
  subjects: Subject[] = [];
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    subject: ['', Validators.required],
    topic: ['', Validators.required],
  });
  save() {
    this.loading = true;
    this.topicService
      .post({
        name: this.form.value.topic ?? '',
        subjectID: this.getSubjectID(this.form.value.subject ?? ''),
      })
      .subscribe((result) => {
        if (result != undefined) {
          this.items.push(result);
          this.resetForm();
        }
        this.loading = false;
      });
  }
  ngOnInit(): void {
    this.getSubjects();
  }
  getSubjects() {
    this.loading = true;
    this.subjectService.get().subscribe((subjects) => {
      this.subjects = subjects;
      this.loading = false;
    });
  }
  getSubjectID(name: string) {
    const s = this.subjects.find((subject) => subject.name == name) as Subject;
    return s._id as string;
  }
  resetForm() {
    this.form.patchValue({
      topic: '',
    });
  }
}

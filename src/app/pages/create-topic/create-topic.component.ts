import { Component, inject, OnInit } from '@angular/core';
import { TopicService } from '../../services/topic.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { HttpService } from '../../services/http.service';
import { Topic } from '../../interfaces/topic';
import { SubjectService } from '../../services/subject.service';
import { Subject } from '../../interfaces/subject';

@Component({
  selector: 'app-create-topic',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-topic.component.html',
  styleUrl: './create-topic.component.scss',
})
export class CreateTopicComponent implements OnInit {
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
    this.topicService
      .post({
        name: this.form.value.topic ?? '',
        subjectID: this.getSubjectID(this.form.value.subject ?? ''),
      })
      .subscribe((result) => {
        this.items.push(result);
        this.resetForm();
      });
  }
  ngOnInit(): void {
    this.getSubjects();
  }
  getSubjects() {
    this.subjectService.get().subscribe((subjects) => {
      this.subjects = subjects;
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

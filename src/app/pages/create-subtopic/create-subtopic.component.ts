import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from '../../interfaces/subject';
import { Topic } from '../../interfaces/topic';
import { HttpService } from '../../services/http.service';
import { SubjectService } from '../../services/subject.service';
import { TopicService } from '../../services/topic.service';
import { SubtopicService } from '../../services/subtopic.service';
import { forkJoin, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-create-subtopic',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './create-subtopic.component.html',
  styleUrl: './create-subtopic.component.scss',
})
export class CreateSubtopicComponent implements OnInit {
  topicService = inject(TopicService);
  subtopicService = inject(SubtopicService);
  subjectService = inject(SubjectService);
  http = inject(HttpService);
  items: Topic[] = [];
  subjects: Subject[] = [];
  topics: Topic[] = [];
  filteredTopics: Topic[] = [];
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    subject: ['', Validators.required],
    topic: ['', Validators.required],
    subtopic: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getResources();
  }
  save() {
    this.subtopicService
      .post({
        name: this.form.value.subtopic ?? '',
        subjectID: this.getSubjectID(this.form.value.subject ?? ''),
        topicID: this.getTopicID(this.form.value.topic ?? ''),
      })
      .subscribe((result) => {
        this.items.push(result);
        this.resetForm();
      });
  }
  getResources() {
    forkJoin([this.subjectService.get(), this.topicService.get()]).subscribe(
      ([subjects, topics]) => {
        this.subjects = subjects;
        this.topics = topics;
      }
    );
  }

  getSubjectID(name: string) {
    const s = this.subjects.find((subject) => subject.name == name) as Subject;
    return s._id as string;
  }
  getTopicID(name: string) {
    const s = this.topics.find((topic) => topic.name == name) as Subject;
    return s._id as string;
  }
  resetForm() {
    this.form.patchValue({
      subtopic: '',
    });
  }
  selectTopics(event: Event) {
    const target = event.target as HTMLInputElement;

    this.filteredTopics = this.topics.filter(
      (topic) => topic.subjectID == this.getSubjectID(target.value)
    );
  }
}

import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { Subtopic } from '../../interfaces/subtopic';
import { Topic } from '../../interfaces/topic';
import { HttpService } from '../../services/http.service';

import { SubjectService } from '../../services/subject.service';
import { SubtopicService } from '../../services/subtopic.service';
import { TopicService } from '../../services/topic.service';
import { Subject } from '../../interfaces/subject';
import { NoteValue } from '../../interfaces/notevalue';

@Component({
  selector: 'notecreator',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './notecreator.component.html',
  styleUrl: './notecreator.component.scss',
})
export class NotecreatorComponent {
  @Output() getValue = new EventEmitter<NoteValue>();
  @Input() items!: NoteValue[];
  topicService = inject(TopicService);
  subtopicService = inject(SubtopicService);
  subjectService = inject(SubjectService);
  http = inject(HttpService);

  subjects: Subject[] = [];
  topics: Topic[] = [];
  subtopics: Subtopic[] = [];
  filteredTopics: Topic[] = [];
  filteredSubtopics: Subtopic[] = [];
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    subject: ['', Validators.required],
    note: ['', Validators.required],
    topic: ['', Validators.required],
    subtopic: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getResources();
  }
  save() {
    this.getValue.emit({
      value: this.form.value.note ?? '',
      subjectID: this.getSubjectID(this.form.value.subject ?? ''),
      topicID: this.getTopicID(this.form.value.topic ?? ''),
      subtopicID: this.getSubtopicID(this.form.value.subtopic ?? ''),
    });
    this.resetForm();
    // this.noteService
    // .post({
    //   value: this.form.value.note ?? '',
    //   subjectID: this.getSubjectID(this.form.value.subject ?? ''),
    //   topicID: this.getTopicID(this.form.value.topic ?? ''),
    //   subtopicID: this.getTopicID(this.form.value.subtopic ?? ''),
    // });
    //   .subscribe((result) => {
    //     this.items.push(result);
    //     this.resetForm();
    //   });
  }
  getResources() {
    forkJoin([
      this.subjectService.get(),
      this.topicService.get(),
      this.subtopicService.get(),
    ]).subscribe(([subjects, topics, subtopics]) => {
      this.subjects = subjects;
      this.topics = topics;
      this.subtopics = subtopics;
    });
  }

  getSubjectID(name: string) {
    const s = this.subjects.find((subject) => subject.name == name) as Subject;
    return s._id as string;
  }
  getSubtopicID(name: string) {
    const s = this.subtopics.find(
      (subtopic) => subtopic.name == name
    ) as Subtopic;
    return s._id as string;
  }
  getTopicID(name: string) {
    const s = this.topics.find((topic) => topic.name == name) as Subject;
    return s._id as string;
  }
  resetForm() {
    this.form.patchValue({
      note: '',
    });
  }
  selectTopics(event: Event) {
    const target = event.target as HTMLInputElement;

    this.filteredTopics = this.topics.filter(
      (topic) => topic.subjectID == this.getSubjectID(target.value)
    );
    // const topics = this.topics.filter(
    //   (topic) => topic.subjectID == this.getSubjectID(target.value)
    // );
    // console.log(topics);
  }
  selectSubtopics(event: Event) {
    const target = event.target as HTMLInputElement;

    this.filteredSubtopics = this.subtopics.filter(
      (subtopic) => subtopic.topicID == this.getTopicID(target.value)
    );
  }
}

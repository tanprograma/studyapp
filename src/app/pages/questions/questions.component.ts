import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Note } from '../../interfaces/note';
import { Subtopic } from '../../interfaces/subtopic';
import { Topic } from '../../interfaces/topic';
import { HttpService } from '../../services/http.service';
import { NoteService } from '../../services/note.service';
import { SubjectService } from '../../services/subject.service';
import { SubtopicService } from '../../services/subtopic.service';
import { TopicService } from '../../services/topic.service';
import { Subject } from '../../interfaces/subject';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
})
export class QuestionsComponent {
  questionService = inject(QuestionService);
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
    topic: ['', Validators.required],
    subtopic: ['', Validators.required],
  });

  items: Note[] = [];

  ngOnInit(): void {
    this.getResources();
  }
  save() {
    this.questionService
      .getID(this.getSubtopicID(this.form.value.subtopic ?? ''))
      .subscribe((res) => {
        this.items = res;
      });
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
  // resetForm() {
  //   this.form.patchValue({
  //     note: '',
  //   });
  // }
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

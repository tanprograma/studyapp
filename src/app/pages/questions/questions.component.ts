import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, forkJoin, of } from 'rxjs';
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
import { LoaderComponent } from '../../components/loader/loader.component';
import { Question } from '../../interfaces/question';
import { PromptConfirmComponent } from '../../components/prompt-confirm/prompt-confirm.component';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [ReactiveFormsModule, PromptConfirmComponent],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
})
export class QuestionsComponent {
  loading = false;
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

  all_items: Question[] = [];
  items: Question[] = [];

  ngOnInit(): void {
    this.getResources();
  }
  search() {
    this.items = this.all_items.filter((item) => {
      return (
        item.subtopicID == this.getSubtopicID(this.form.value.subtopic ?? '')
      );
    });
  }
  getResources() {
    this.loading = true;
    forkJoin([
      this.subjectService.get(),
      this.topicService.get(),
      this.subtopicService.get(),
      this.questionService.get(),
    ]).subscribe(([subjects, topics, subtopics, questions]) => {
      this.subjects = subjects;
      this.topics = topics;
      this.subtopics = subtopics;
      this.items = this.all_items = questions;
      this.loading = false;
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

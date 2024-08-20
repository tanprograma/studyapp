import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from '../../interfaces/subject';
import { Subtopic } from '../../interfaces/subtopic';
import { Topic } from '../../interfaces/topic';
import { HttpService } from '../../services/http.service';
import { SubjectService } from '../../services/subject.service';
import { SubtopicService } from '../../services/subtopic.service';
import { TopicService } from '../../services/topic.service';
import { catchError, forkJoin, of } from 'rxjs';
import { NoteService } from '../../services/note.service';
import { Note } from '../../interfaces/note';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-notes-page',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent],
  templateUrl: './notes-page.component.html',
  styleUrl: './notes-page.component.scss',
})
export class NotesPageComponent {
  loading = false;
  noteService = inject(NoteService);
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

  all_items: Note[] = [];
  items: Note[] = [];

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
      this.noteService.get(),
    ]).subscribe(([subjects, topics, subtopics, notes]) => {
      this.subjects = subjects;
      this.topics = topics;
      this.subtopics = subtopics;
      this.all_items = this.items = notes;
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

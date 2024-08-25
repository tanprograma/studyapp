import {
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { TopicService } from '../../services/topic.service';
import { SubtopicService } from '../../services/subtopic.service';
import { Topic } from '../../interfaces/topic';
import { Subtopic } from '../../interfaces/subtopic';
import { forkJoin } from 'rxjs';
import { PromptConfirmComponent } from '../../components/prompt-confirm/prompt-confirm.component';
import { Subject } from '../../interfaces/subject';
import { SubjectService } from '../../services/subject.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-subtopics',
  standalone: true,
  imports: [PromptConfirmComponent, ReactiveFormsModule],
  templateUrl: './manage-subtopics.component.html',
  styleUrl: './manage-subtopics.component.scss',
})
export class ManageSubtopicsComponent implements OnInit {
  topicService = inject(TopicService);
  subjectService = inject(SubjectService);
  subtopicService = inject(SubtopicService);
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    subject: [''],
    topic: [''],
    subtopic: [''],
  });
  loading = false;
  confirm = false;
  message = '';
  deleteID = '';
  filterCriterion = signal<
    '' | 'subject' | 'subtopic' | 'topic' | 'delete' | 'all'
  >('');
  subject = signal<string>('');
  topic = signal<string>('');
  subtopic = signal<string>('');
  all_topics: Topic[] = [];
  all_subjects: Subject[] = [];
  all_subtopics: Subtopic[] = [];

  ngOnInit(): void {
    this.fetchResources();
  }
  topics = computed(() => {
    switch (this.subject()) {
      case '':
        return this.all_topics;
      default:
        console.log(this.subject());
        return this.all_topics.filter(
          (topic) => topic.subjectID == this.getSubjectId(this.subject())
        );
    }
  });
  subtopics = computed(() => {
    switch (this.subject()) {
      case '':
        return this.all_subtopics;
      default:
        return this.all_subtopics.filter(
          (subtopic) => subtopic.subjectID == this.subject()
        );
    }
  });
  items = computed(() => {
    switch (this.filterCriterion()) {
      case 'topic':
        return this.all_subtopics.filter(
          (subtopic) => subtopic.topicID == this.topic()
        );

      case 'subject':
        const items = this.all_subtopics.filter(
          (subtopic) => subtopic.subjectID == this.subject()
        );
        console.log(items);
        return items;

      case 'subtopic':
        return this.all_subtopics.filter(
          (subtopic) => subtopic.name == this.subtopic()
        );

      default:
        return this.all_subtopics;
    }
  });
  // form filters
  filterAll() {
    this.filterCriterion.set('');
  }
  filterTopic(event: Event) {
    const target = event.target as HTMLInputElement;
    this.topic.set(target.value);
    this.filterCriterion.set('topic');
  }
  filterSubtopic(event: Event) {
    const target = event.target as HTMLInputElement;
    this.subtopic.set(target.value);
    this.filterCriterion.set('subtopic');
  }
  filterSubject(event: Event) {
    const target = event.target as HTMLInputElement;
    this.subject.set(target.value);
    this.filterCriterion.set('subject');
  }

  clearForm() {
    this.form.patchValue({
      subject: '',
      topic: '',
      subtopic: '',
    });
  }
  fetchResources() {
    this.loading = true;
    forkJoin([
      this.subjectService.get(),
      this.topicService.get(),
      this.subtopicService.get(),
    ]).subscribe(([subjects, topics, subtopics]) => {
      this.all_topics = topics;
      this.all_subjects = subjects;
      this.all_subtopics = subtopics.map((subtopic) => {
        return {
          ...subtopic,
          subjectID: this.getSubjectName(subtopic.subjectID),
          topicID: this.getTopicName(subtopic.topicID),
        };
      });
      this.filterCriterion.set('all');

      this.loading = false;
    });
  }
  getSubjectName(id: string) {
    return this.all_subjects.find((subject) => subject._id == id)
      ?.name as string;
  }
  getSubjectId(name: string) {
    return this.all_subjects.find((subject) => subject.name == name)
      ?._id as string;
  }
  getTopicName(id: string) {
    return this.all_topics.find((topic) => topic._id == id)?.name as string;
  }
  // getTopicID(id: string) {
  //   return this.all_topics.find((topic) => topic._id == id)?.name as string;
  // }
  onDelete(id: any) {
    this.deleteID = id as string;
    this.message = `delete subtopic with id : ${this.deleteID}?`;
    this.confirm = true;
  }
  deleteConfirm(isConfirmed: boolean) {
    if (!isConfirmed) return;
    this.delete();
  }
  delete() {
    this.loading = true;
    this.confirm = false;
    this.subtopicService.delete(this.deleteID).subscribe((res) => {
      if (res.success) {
        this.all_subtopics = this.all_subtopics.filter(
          (subtopic) => subtopic._id != this.deleteID
        );

        if (this.filterCriterion() != 'delete') {
          this.filterCriterion.set('delete');
        } else {
          this.filterCriterion.set('');
        }

        this.loading = false;
      }
    });
  }
}

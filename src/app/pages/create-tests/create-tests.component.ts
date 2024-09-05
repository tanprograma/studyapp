import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Subject } from '../../interfaces/subject';
import { Exam } from '../../interfaces/exam';
import { MCQ, QuestionType } from '../../interfaces/mcq';
import { Subtopic } from '../../interfaces/subtopic';
import { Topic } from '../../interfaces/topic';
import { McqService } from '../../services/mcq.service';
import { SubjectService } from '../../services/subject.service';
import { SubtopicService } from '../../services/subtopic.service';
import { TopicService } from '../../services/topic.service';
import { McqComponent } from '../../components/mcq/mcq.component';
import { PromptConfirmComponent } from '../../components/prompt-confirm/prompt-confirm.component';

@Component({
  selector: 'app-create-tests',
  standalone: true,
  imports: [McqComponent, PromptConfirmComponent, ReactiveFormsModule],
  templateUrl: './create-tests.component.html',
  styleUrl: './create-tests.component.scss',
})
export class CreateTestsComponent {
  // view: View = 'questions';
  examService = inject(McqService);
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    format: ['', Validators.required],
    subject: ['', Validators.required],
    topic: ['', Validators.required],
    subtopic: ['', Validators.required],
  });
  exam: Exam = {
    subjectID: '',
    topicID: '',
    subtopicID: '',
    questions: [],
    completed: false,
    marked: false,
  };
  marked: Exam = {
    subjectID: '',
    topicID: '',
    subtopicID: '',
    questions: [],
    completed: false,
    marked: false,
  };
  unmarked: Exam = {
    subjectID: '',
    topicID: '',
    subtopicID: '',
    questions: [],
    completed: false,
    marked: false,
  };

  questions: MCQ[] = [];
  confirmation: boolean = false;
  // setView(view: View) {
  //   this.view = view;
  // }
  confirm() {
    this.confirmation = true;
  }
  resetExam() {
    return {
      subjectID: '',
      topicID: '',
      subtopicID: '',
      questions: [],
      completed: false,
      marked: false,
    };
  }
  save(shouldSubmit: boolean) {
    this.confirmation = false;
    if (!shouldSubmit) return;

    this.saveQuestions();
    return;
  }
  saveQuestions() {
    this.loading = true;
    this.examService
      .post({
        ...this.exam,
        completed: true,
        subjectID: this.getID(this.form.value.subject ?? '', this.subjects),
        topicID: this.getID(this.form.value.topic ?? '', this.filteredTopics),
        subtopicID: this.getID(
          this.form.value.subtopic ?? '',
          this.filteredSubtopics
        ),
      })
      .subscribe((res) => {
        this.exam = this.resetExam();
        this.loading = false;
      });
  }

  add() {
    if (this.exam.completed) return;
    const QUESTIONS_TO_CREATE = 1;
    this.addXtimes(QUESTIONS_TO_CREATE);
    this.form.patchValue({ format: '' });
  }
  select(item: { qn: number; option: string; type: string; state: boolean }) {
    if (item.type == 'mcq') {
      this.selectMCQ(item);
      return;
    }
    this.selectMMQ(item);
  }

  selectMMQ(item: {
    qn: number;
    option: string;
    type: string;
    state: boolean;
  }) {
    // selecting an mmq

    this.exam.questions = this.exam.questions.map((qn) => {
      return qn.qn == item.qn
        ? {
            ...qn,
            options: qn.options.map((op) => {
              return op.option == item.option
                ? { ...op, isAnswer: item.state ? true : false }
                : op;
            }),
          }
        : qn;
    });
    console.log(this.exam.questions);
  }

  selectMCQ(item: {
    qn: number;
    option: string;
    type: string;
    state: boolean;
  }) {
    // choosing an mcq as anwer
    this.exam.questions = this.exam.questions.map((qn) => {
      return qn.qn == item.qn
        ? {
            ...qn,
            options: qn.options.map((op) => {
              return op.option == item.option
                ? { ...op, isAnswer: item.state ? true : false }
                : { ...op, isAnswer: false };
            }),
          }
        : qn;
    });
  }

  // config code

  topicService = inject(TopicService);
  subtopicService = inject(SubtopicService);
  subjectService = inject(SubjectService);

  subjects: Subject[] = [];
  topics: Topic[] = [];
  subtopics: Subtopic[] = [];
  filteredTopics: Topic[] = [];
  filteredSubtopics: Subtopic[] = [];

  ngOnInit(): void {
    this.getResources();
  }

  getResources() {
    this.loading = true;
    forkJoin([
      this.subjectService.get(),
      this.topicService.get(),
      this.subtopicService.get(),
    ]).subscribe(([subjects, topics, subtopics]) => {
      this.subjects = subjects;
      this.topics = topics;
      this.subtopics = subtopics;

      this.loading = false;
    });
  }
  loading = false;

  selectTopics(event: Event) {
    this.resetTopicAndSubtopic();
    const target = event.target as HTMLInputElement;

    this.filteredTopics = this.topics.filter(
      (topic) => topic.subjectID == this.getID(target.value, this.subjects)
    );
  }
  selectSubtopics(event: Event) {
    const target = event.target as HTMLInputElement;

    this.filteredSubtopics = this.subtopics.filter(
      (subtopic) =>
        subtopic.topicID == this.getID(target.value, this.filteredTopics)
    );
  }

  resetTopicAndSubtopic() {
    this.form.patchValue({
      topic: '',
      subtopic: '',
    });
    this.filteredSubtopics = [];
    this.filteredTopics = [];
  }
  getID<T extends { _id?: string; name: string }>(name: string, items: T[]) {
    return items.find((item) => item.name == name)?._id as string;
  }
  getName<T extends { _id?: string; name: string }>(id: string, items: T[]) {
    return items.find((item) => item._id == id)?.name as string;
  }
  addXtimes(n: number) {
    for (let i = 0; i < n; i++) {
      this.exam.questions.push({
        options: [
          { option: 'A', selected: false, isAnswer: false },
          { option: 'B', selected: false, isAnswer: false },
          { option: 'C', selected: false, isAnswer: false },
          { option: 'D', selected: false, isAnswer: false },
          { option: 'E', selected: false, isAnswer: false },
          { option: 'F', selected: false, isAnswer: false },
          { option: 'G', selected: false, isAnswer: false },
          { option: 'H', selected: false, isAnswer: false },
          { option: 'I', selected: false, isAnswer: false },
          { option: 'J', selected: false, isAnswer: false },
          { option: 'K', selected: false, isAnswer: false },
          { option: 'L', selected: false, isAnswer: false },
          { option: 'M', selected: false, isAnswer: false },
          { option: 'N', selected: false, isAnswer: false },
          { option: '0', selected: false, isAnswer: false },
        ],
        qn: this.exam.questions.length + 1,
        type: (this.form.value.format ?? '') as QuestionType,
      });
    }
  }
}

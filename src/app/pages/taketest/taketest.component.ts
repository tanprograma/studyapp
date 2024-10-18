import { Component, inject, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Subject } from '../../interfaces/subject';
import { Exam } from '../../interfaces/exam';
import { Subtopic } from '../../interfaces/subtopic';
import { Topic } from '../../interfaces/topic';
import { McqService } from '../../services/mcq.service';
import { SubjectService } from '../../services/subject.service';
import { SubtopicService } from '../../services/subtopic.service';
import { TopicService } from '../../services/topic.service';
import { McqMarkingComponent } from '../../components/mcq-marking/mcq-marking.component';
import { PromptConfirmComponent } from '../../components/prompt-confirm/prompt-confirm.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { McqComponent } from '../../components/mcq/mcq.component';
import { DOCUMENT } from '@angular/common';
import { MCQ } from '../../interfaces/mcq';
type View = 'tests' | 'mark';
@Component({
  selector: 'app-taketest',
  standalone: true,
  imports: [McqComponent, PromptConfirmComponent, ReactiveFormsModule],
  templateUrl: './taketest.component.html',
  styleUrl: './taketest.component.scss',
})
export class TaketestComponent implements OnInit {
  doc = inject(DOCUMENT);
  view: View = 'tests';
  examService = inject(McqService);
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    format: ['', Validators.required],
    subject: ['', Validators.required],
    topic: ['', Validators.required],
    subtopic: ['', Validators.required],
  });
  exams: Exam[] = [];
  filteredExams: Exam[] = [];
  exam: Exam = {
    subjectID: '',
    topicID: '',
    subtopicID: '',
    questions: [],
    completed: false,
    marked: false,
  };

  confirmation: boolean = false;
  setView(view: View) {
    this.view = view;
  }
  confirm() {
    this.confirmation = true;
  }
  toMark(item: Exam) {
    this.exam = item;
    this.heading = `${this.exam.subjectID}-${this.exam.topicID}-${this.exam.subtopicID}`;
    this.view = 'mark';
  }
  getDate(d: any) {
    return new Date(d).toUTCString();
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
  // displayResults(filter: 'all' | 'marked' | 'unmarked') {
  //   if (this.view == 'mark') return;
  //   switch (filter) {
  //     case 'all':
  //       this.filteredExams = this.exams;
  //       break;
  //     case 'marked':
  //       this.filteredExams = this.exams.filter((exam) => exam.marked);
  //       break;
  //     case 'unmarked':
  //       this.filteredExams = this.exams.filter((exam) => !exam.marked);
  //       break;

  //     default:
  //       break;
  //   }
  // }
  save(shouldSubmit: boolean) {
    this.confirmation = false;
    if (!shouldSubmit) return;

    this.saveResults();
    return;
  }

  saveResults() {
    this.loading = true;

    this.examService.mark(this.getExam()).subscribe((res) => {
      if (res == false) {
        this.loading = false;
        return;
      }
      this.exam = this.resetExam();
      this.heading = '';
      this.view = 'tests';
      this.loading = false;
    });
  }
  getExam(): Exam {
    const { subjectID, topicID, subtopicID } = this.exams.find(
      (exam) => exam._id == this.exam._id
    ) as Exam;

    return {
      questions: this.exam.questions,
      completed: true,
      subjectID: subjectID,
      topicID: topicID,
      subtopicID: subtopicID,
      marked: true,
    };
    // return {
    //   questions: this.randomizeAnswer(this.exam.questions),
    //   completed: true,
    //   subjectID: subjectID,
    //   topicID: topicID,
    //   subtopicID: subtopicID,
    //   marked: true,
    // };
  }
  heading: string = '';
  mark(item: { qn: number; option: string; type: string; state: boolean }) {
    if (this.exam.marked) return;

    if (item.type == 'mcq') {
      this.markMCQ(item);
      return;
    }
    this.markMMQ(item);
  }

  markMMQ(item: { qn: number; option: string; type: string; state: boolean }) {
    // marking an mmq
    this.exam.questions = this.exam.questions.map((qn) => {
      return qn.qn == item.qn
        ? {
            ...qn,
            options: qn.options.map((op) => {
              return op.option == item.option
                ? { ...op, selected: item.state ? true : false }
                : op;
            }),
          }
        : qn;
    });
  }

  markMCQ(item: { qn: number; option: string; type: string; state: boolean }) {
    // marking an mcq as anwer
    this.exam.questions = this.exam.questions.map((qn) => {
      return qn.qn == item.qn
        ? {
            ...qn,
            options: qn.options.map((op) => {
              return op.option == item.option
                ? { ...op, selected: item.state ? true : false }
                : { ...op, selected: false };
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
  filterSubject(event: Event) {
    this.resetTopicAndSubtopic();
    const target = event.target as HTMLInputElement;
    this.filteredExams = this.exams
      .filter(
        (exam) => exam.subjectID == this.getID(target.value, this.subjects)
      )
      .map((exam) => this.mapExam(exam));
    this.selectTopics(target.value);
  }
  filterTopic(event: Event) {
    const target = event.target as HTMLInputElement;
    this.filteredExams = this.filteredExams.filter(
      (exam) => exam.topicID == target.value
    );

    this.selectSubtopics(target.value);
  }
  filterSubtopic(event: Event) {
    const target = event.target as HTMLInputElement;
    this.filteredExams = this.filteredExams.filter(
      (exam) => exam.subtopicID == target.value
    );
  }
  clearFilter() {
    this.form.patchValue({
      subject: '',
      topic: '',
      subtopic: '',
    });
    this.filteredExams = this.exams.map((exam) => {
      return this.mapExam(exam);
    });
  }
  selectTopics(subject: string) {
    this.filteredTopics = this.topics.filter(
      (topic) => topic.subjectID == this.getID(subject, this.subjects)
    );
  }
  selectSubtopics(topic: string) {
    this.filteredSubtopics = this.subtopics.filter(
      (subtopic) => subtopic.topicID == this.getID(topic, this.filteredTopics)
    );
  }

  getID<T extends { _id?: string; name: string }>(name: string, items: T[]) {
    return items.find((item) => item.name == name)?._id as string;
  }
  getName<T extends { _id?: string; name: string }>(id: string, items: T[]) {
    return items.find((item) => item._id == id)?.name as string;
  }
  resetTopicAndSubtopic() {
    this.form.patchValue({
      topic: '',
      subtopic: '',
    });
    this.filteredSubtopics = [];
    this.filteredTopics = [];
  }
  getResources() {
    this.loading = true;
    forkJoin([
      this.subjectService.get(),
      this.topicService.get(),
      this.subtopicService.get(),
      this.examService.getAll(),
    ]).subscribe(([subjects, topics, subtopics, exams]) => {
      this.subjects = subjects;
      this.topics = topics;
      this.subtopics = subtopics;
      this.exams = exams;
      this.filteredExams = exams.map((exam) => {
        return this.mapExam(exam);
      });

      this.loading = false;
    });
  }
  loading = false;
  mapExam(exam: Exam) {
    return {
      ...exam,
      subjectID: this.getSubjectName(exam.subjectID),
      topicID: this.getTopicName(exam.topicID),
      subtopicID: this.getSubtopicName(exam.subtopicID),
    };
  }
  getSubjectName(id: string) {
    const s = this.subjects.find((subject) => subject._id == id) as Subject;
    return s.name as string;
  }
  getSubtopicName(id: string) {
    const s = this.subtopics.find((subtopic) => subtopic._id == id) as Subtopic;
    return s.name as string;
  }
  getTopicName(id: string) {
    const s = this.topics.find((topic) => topic._id == id) as Topic;
    return s.name as string;
  }
  randomizeAnswer(questions: MCQ[]) {
    return questions.map((question) => {
      const inde = 3;
      question.options = question.options.map((option, index) => {
        return inde == index ? { ...option, selected: true } : option;
      });
      return question;
    });
  }
}

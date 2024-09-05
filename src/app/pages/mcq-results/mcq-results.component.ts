import { Component, inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Subject } from '../../interfaces/subject';
import { Exam } from '../../interfaces/exam';
import { Subtopic } from '../../interfaces/subtopic';
import { Topic } from '../../interfaces/topic';
import { McqService } from '../../services/mcq.service';
import { SubjectService } from '../../services/subject.service';
import { SubtopicService } from '../../services/subtopic.service';
import { TopicService } from '../../services/topic.service';

import { PromptConfirmComponent } from '../../components/prompt-confirm/prompt-confirm.component';
import { McqResComponent } from '../../components/mcq-res/mcq-res.component';
import { MCQ } from '../../interfaces/mcq';
type View = 'tests' | 'results';
@Component({
  selector: 'app-mcq-results',
  standalone: true,
  imports: [McqResComponent, PromptConfirmComponent],
  templateUrl: './mcq-results.component.html',
  styleUrl: './mcq-results.component.scss',
})
export class McqResultsComponent {
  view: View = 'tests';
  examService = inject(McqService);
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
  toResult(item: Exam) {
    this.exam = item;
    this.view = 'results';
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
  displayResults(filter: 'all' | 'marked' | 'unmarked') {
    if (this.view == 'results') return;
    switch (filter) {
      case 'all':
        this.filteredExams = this.exams;
        break;
      case 'marked':
        this.filteredExams = this.exams.filter((exam) => exam.marked);
        break;
      case 'unmarked':
        this.filteredExams = this.exams.filter((exam) => !exam.marked);
        break;

      default:
        break;
    }
  }
  calculateScore(item: Exam) {
    const qns = item.questions.length;
    const score = item.questions.reduce((previuos: number, question: MCQ) => {
      const right = question.options.find((op) => op.selected && op.isAnswer);

      if (right != undefined) {
        return previuos + 1;
      }
      return previuos;
    }, 0);
    return `${score}/${qns}(${((score * 100) / qns).toFixed(1)})`;
  }

  // config code

  topicService = inject(TopicService);
  subtopicService = inject(SubtopicService);
  subjectService = inject(SubjectService);

  subjects: Subject[] = [];
  topics: Topic[] = [];
  subtopics: Subtopic[] = [];

  ngOnInit(): void {
    this.getResources();
  }

  getResources() {
    this.loading = true;
    forkJoin([
      this.subjectService.get(),
      this.topicService.get(),
      this.subtopicService.get(),
      this.examService.getAllExamResults(),
    ]).subscribe(([subjects, topics, subtopics, exams]) => {
      this.subjects = subjects;
      this.topics = topics;
      this.subtopics = subtopics;
      this.exams = this.filteredExams = exams.map((exam) => {
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
}

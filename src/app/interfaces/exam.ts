export type Choice = {
  sn: number;
  option: string;
  selected: string;
};
export type Result = {
  sn: number;
  option: string;
  isAnswer: string;
};
export type Exam = {
  topic: string;
  subject: string;
  book: string;
  questions: Choice[];
  _id: string;
};
export interface ExamResult {
  _id: string;
  book: string;
  topic: string;
  subject: string;
  questions: Choice[];
  user: string;
}
export interface StudyQuestion {
  _id: string;
  topic: string;
  subject: string;
  title: string;
  author: string;
}
// a derived from Exam for quick access
export interface ExamItem {
  _id: string;
  book: string;
  topic: string;
  questions: number;
}

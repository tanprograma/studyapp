export interface MCQ {
  qn: number;
  type: QuestionType;
  options: { option: string; selected: boolean; isAnswer: boolean }[];
  _id?: string;
}
export type QuestionType = 'mcq' | 'mmq';

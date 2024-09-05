import { MCQ } from './mcq';

export interface Exam {
  subjectID: string;
  subtopicID: string;
  topicID: string;
  questions: MCQ[];
  marked: boolean;
  completed: boolean;
  _id?: string;
  createdAt?: string;
}

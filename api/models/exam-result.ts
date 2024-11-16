import { Schema, model, Types } from 'mongoose';
import { Exam, ExamResult } from '../../src/app/interfaces/exam';

const schema = new Schema<ExamResult>(
  {
    // user: String,
    book: String,
    topic: String,
    subject: String,
    questions: [{ sn: Number, option: String, selected: String }],
  },
  { timestamps: true }
);
const mymodel = model<Exam>('Exam_result', schema);
export default mymodel;

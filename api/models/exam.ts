import { Schema, model, Types } from 'mongoose';
import { Exam } from '../../src/app/interfaces/exam';

const schema = new Schema<Exam>(
  {
    book: String,
    topic: String,
    questions: [{ sn: Number, option: String, selected: String }],
  },
  { timestamps: true }
);
const mymodel = model<Exam>('Exam', schema);
export default mymodel;
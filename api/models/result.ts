import { Schema, model, Types } from 'mongoose';
interface IExam {
  subjectID: Types.ObjectId;
  subtopicID: Types.ObjectId;
  topicID: Types.ObjectId;
  marked: boolean;
  completed: boolean;
  questions: Qn[];
}
interface Qn {
  qn: number;
  type: string;
  options: { option: string; selected: boolean; isAnswer: boolean };
}
const optionSchema = new Schema<Qn>(
  {
    option: String,
    selected: Boolean,
    isAnswer: Boolean,
  },
  { _id: false }
);
const questionSchema = new Schema<Qn>(
  {
    qn: Number,
    type: String,
    options: [optionSchema],
  },
  { _id: false }
);
const schema = new Schema<IExam>(
  {
    topicID: { type: Schema.Types.ObjectId, ref: 'Topic' },
    subjectID: { type: Schema.Types.ObjectId, ref: 'Subject' },
    subtopicID: { type: Schema.Types.ObjectId, ref: 'Subtopic' },
    questions: [questionSchema],
    completed: Boolean,
    marked: Boolean,
  },
  { timestamps: true }
);
const mymodel = model<IExam>('Result', schema);
export default mymodel;

import { Schema, model } from 'mongoose';
import { StudyQuestion } from '../../src/app/interfaces/exam';

const schema = new Schema<StudyQuestion>({
  subject: String,
  topic: String,
  title: String,
  author: String,
});
const mymodel = model<StudyQuestion>('Studyquestion', schema);
export default mymodel;

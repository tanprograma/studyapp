import { Schema, model, Types } from 'mongoose';
interface IQuestion {
  value: string;
  subjectID: Types.ObjectId;
  subtopicID: Types.ObjectId;
  topicID: Types.ObjectId;
}
const schema = new Schema<IQuestion>(
  {
    topicID: { type: Schema.Types.ObjectId, ref: 'Topic' },
    subjectID: { type: Schema.Types.ObjectId, ref: 'Subject' },
    subtopicID: { type: Schema.Types.ObjectId, ref: 'Subtopic' },
    value: { type: String, lowercase: true },
  },
  { timestamps: true }
);
const mymodel = model<IQuestion>('Question', schema);
export default mymodel;

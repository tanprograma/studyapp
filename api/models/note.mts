import { Schema, model, Types } from "mongoose";
interface INote {
  value: string;
  subjectID: Types.ObjectId;
  subtopicID: Types.ObjectId;
  topicID: Types.ObjectId;
}
const schema = new Schema<INote>(
  {
    topicID: { type: Schema.Types.ObjectId, ref: "Topic" },
    subjectID: { type: Schema.Types.ObjectId, ref: "Subject" },
    subtopicID: { type: Schema.Types.ObjectId, ref: "Subtopic" },
    value: { type: String, lowercase: true },
  },
  { timestamps: true }
);
const mymodel = model<INote>("Note", schema);
export default mymodel;

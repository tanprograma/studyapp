import { Schema, model, Types } from "mongoose";
interface ISubtopic {
  name: string;
  topicID: Types.ObjectId;
  subjectID: Types.ObjectId;
}
const schema = new Schema<ISubtopic>({
  name: { type: String, lowercase: true },
  topicID: { type: Schema.Types.ObjectId, ref: "Topic" },
  subjectID: { type: Schema.Types.ObjectId, ref: "Subject" },
});
const mymodel = model<ISubtopic>("Subtopic", schema);
export default mymodel;

import { Schema, model, Types } from "mongoose";
interface ITopic {
  name: string;
  subjectID: Types.ObjectId;
}
const schema = new Schema<ITopic>({
  name: { type: String, lowercase: true },
  subjectID: { type: Schema.Types.ObjectId, ref: "Subject" },
});
const mymodel = model<ITopic>("Topic", schema);
export default mymodel;

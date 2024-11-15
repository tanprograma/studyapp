import { Schema, model, Types } from "mongoose";
import { Topic } from "../../src/app/interfaces/topic";

const schema = new Schema<Topic>({
  subject: String,
  name: { type: String, lowercase: true },
});
const mymodel = model<Topic>("Topic", schema);
export default mymodel;

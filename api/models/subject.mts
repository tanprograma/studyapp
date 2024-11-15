import { Schema, model } from "mongoose";
import { Subject } from "../../src/app/interfaces/subject";

const schema = new Schema<Subject>({
  name: { type: String, lowercase: true },
});
const mymodel = model<Subject>("Subject", schema);
export default mymodel;

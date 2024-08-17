import { Schema, model } from "mongoose";
interface ISubject {
  name: string;
}
const schema = new Schema<ISubject>({
  name: { type: String, lowercase: true },
});
const mymodel = model<ISubject>("Subject", schema);
export default mymodel;

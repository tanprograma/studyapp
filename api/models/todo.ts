import { Schema, model } from 'mongoose';
interface ITodo {
  value: string;
}
const schema = new Schema<ITodo>(
  {
    value: { type: String, lowercase: true },
  },
  { timestamps: true }
);
const mymodel = model<ITodo>('Subject', schema);
export default mymodel;

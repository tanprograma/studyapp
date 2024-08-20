import { Schema, model } from 'mongoose';
interface ITodo {
  value: string;
  completed: boolean;
}
const schema = new Schema<ITodo>(
  {
    value: { type: String, lowercase: true },
    completed: { type: Boolean, default: () => false },
  },
  { timestamps: true }
);
const mymodel = model<ITodo>('Todo', schema);
export default mymodel;

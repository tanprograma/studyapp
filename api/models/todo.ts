import { Schema, model } from 'mongoose';
import { Todo } from '../../src/app/interfaces/todo';

const schema = new Schema<Todo>(
  {
    title: { type: String, lowercase: true },
    completed: { type: Boolean, default: () => false },
  },
  { timestamps: true }
);
const mymodel = model<Todo>('Todo', schema);
export default mymodel;

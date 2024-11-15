import { Schema, model } from 'mongoose';
import { Plan } from '../../src/app/interfaces/plan';
const schema = new Schema<Plan>(
  {
    author: String,
    title: { type: String, lowercase: true },
    completed: { type: Boolean, default: () => false },
  },
  { timestamps: true }
);
const mymodel = model<Plan>('Plan', schema);
export default mymodel;

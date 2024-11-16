import { Schema, model } from 'mongoose';
import { Project } from '../../src/app/interfaces/project';

const schema = new Schema<Project>(
  {
    // author: String,
    title: { type: String, lowercase: true },
    completed: { type: Boolean, default: () => false },
  },
  { timestamps: true }
);
const mymodel = model<Project>('Project', schema);
export default mymodel;

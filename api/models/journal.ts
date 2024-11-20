import { Schema, model } from 'mongoose';
import { Journal } from '../../src/app/interfaces/journal';

const schema = new Schema<Journal>(
  {
    title: String,
  },
  { timestamps: true }
);
const mymodel = model<Journal>('Journal', schema);
export default mymodel;

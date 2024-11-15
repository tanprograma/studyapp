import { Schema, model } from 'mongoose';
import { Quote } from '../../src/app/interfaces/quote';

const schema = new Schema<Quote>({
  title: String,
  author: String,
});
const mymodel = model<Quote>('Quote', schema);
export default mymodel;

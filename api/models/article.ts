import { Schema, model } from 'mongoose';
import { Article } from '../../src/app/interfaces/article';

const schema = new Schema<Article>(
  {
    title: { main: String, sub: String },
    content: String,
    author: String,
  },
  { timestamps: true }
);
const mymodel = model<Article>('Article', schema);
export default mymodel;

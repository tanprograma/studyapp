import { Schema, model } from 'mongoose';
interface Content {
  format: string;
  composition: any;
}
interface IArticle {
  title: string;
  content: Content[];
}
const schema = new Schema<IArticle>(
  {
    title: { type: String },
    content: [{ format: String, composition: {} }],
  },
  { timestamps: true }
);
const mymodel = model<IArticle>('Article', schema);
export default mymodel;

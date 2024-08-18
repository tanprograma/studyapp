import { Schema, model } from 'mongoose';
interface IQuote {
  name: string;
  author: string;
}
const schema = new Schema<IQuote>({
  value: { type: String, lowercase: true },
  author: { type: String, lowercase: true },
});
const mymodel = model<IQuote>('Quote', schema);
export default mymodel;

import { Schema, model } from 'mongoose';
import { Book } from '../../src/app/interfaces/book';

const schema = new Schema<Book>({
  subject: String,
  name: { type: String, lowercase: true },
});
const mymodel = model<Book>('Book', schema);
export default mymodel;

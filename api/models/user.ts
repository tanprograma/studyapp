import { Schema, model, Types } from 'mongoose';
import { User } from '../../src/app/interfaces/user';

const schema = new Schema<User>({
  username: String,
  firstname: String,
  surname: String,
  password: String,
});
const mymodel = model<User>('User', schema);
export default mymodel;

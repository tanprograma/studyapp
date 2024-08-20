import { Schema, model } from 'mongoose';
interface IPlan {
  value: string;
  completed: boolean;
}
const schema = new Schema<IPlan>(
  {
    value: { type: String, lowercase: true },
    completed: { type: Boolean, default: () => false },
  },
  { timestamps: true }
);
const mymodel = model<IPlan>('Plan', schema);
export default mymodel;

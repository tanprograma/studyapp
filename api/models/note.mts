import { Schema, model, Types } from "mongoose";
import { Note } from "../../src/app/interfaces/note";

const schema = new Schema<Note>(
  {
    // author: String,
    book: String,
    topic: String,
    title: String,
  },
  { timestamps: true }
);
const mymodel = model<Note>("Note", schema);
export default mymodel;

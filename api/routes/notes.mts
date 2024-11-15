import express from "express";
import NotesModel from "../models/note.mjs";
const router = express.Router();
router.get("/", async (req, res) => {
  const queryString = req.query as { author: string; topic: string };
  const notes = await NotesModel.find(queryString);
  res.send(notes);
});

router.post("/", async (req, res) => {
  // creates note
  const note = req.body;
  const result = await NotesModel.create(note);
  res.send(result);
});
router.delete("/:id", async (req, res) => {
  // creates note
  try {
    const id = req.params.id;
    const result = await NotesModel.findByIdAndDelete({ _id: id });
    res.send(true);
  } catch (error) {
    res.send(false);
  }
});
// update note
router.post("/:id", async (req, res) => {
  const id = req.params.id;
  const original = await NotesModel.findOne({ _id: id });

  if (!!original) {
    original.title = req.body.title;
    await original.save();
    res.send(true);
  } else {
    res.send(false);
  }
});

export default router;

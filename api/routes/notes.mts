import express from "express";
import NotesModel from "../models/note.mjs";
const router = express.Router();
router.get("/", async (req, res) => {
  const notes = await NotesModel.find();
  res.send(notes);
});
router.get("/:id", async (req, res) => {
  const subtopicID = req.params.id;

  const notes = await NotesModel.find().where({ subtopicID: subtopicID });

  res.send(notes);
});
router.post("/create", async (req, res) => {
  const note = req.body;
  const result = await NotesModel.create(note);
  res.send(result);
});
router.post("/createmany", async (req, res) => {
  const notes = req.body;
  const result = await NotesModel.create(notes);
  res.send(result);
});
export default router;

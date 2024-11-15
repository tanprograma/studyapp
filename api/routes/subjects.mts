import express from "express";
import SubjectModel from "../models/subject.mjs";
const router = express.Router();
router.get("/", async (req, res) => {
  const subjects = await SubjectModel.find();
  res.send(subjects);
});
router.post("/", async (req, res) => {
  const subject = req.body;
  const result = await SubjectModel.create(subject);
  res.send(result);
});
router.delete("/:id", async (req, res) => {
  try {
    const subject = req.params.id;
    const result = await SubjectModel.findOneAndDelete({ _id: subject });
    res.send(true);
  } catch (error) {
    res.send(false);
  }
});

export default router;

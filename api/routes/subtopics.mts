import express from "express";
import SubtopicModel from "../models/subtopic.mjs";
const router = express.Router();
router.get("/", async (req, res) => {
  const subtopics = await SubtopicModel.find();
  res.send(subtopics);
});
router.post("/create", async (req, res) => {
  const subtopic = req.body;
  const result = await SubtopicModel.create(subtopic);
  res.send(result);
});
router.post("/createmany", async (req, res) => {
  const subtopics = req.body;
  const result = await SubtopicModel.create(subtopics);
  res.send(result);
});
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await SubtopicModel.findOneAndDelete({ _id: id });
    res.send({ success: true, result });
  } catch (error) {
    res.send({ success: false, result: {} });
  }
});
export default router;

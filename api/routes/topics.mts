import express from "express";
import TopicModel from "../models/topic.mjs";
const router = express.Router();
router.get("/", async (req, res) => {
  const topics = await TopicModel.find();
  res.send(topics);
});
router.post("/", async (req, res) => {
  const topic = req.body;
  const result = await TopicModel.create(topic);
  res.send(result);
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await TopicModel.findOneAndDelete({ _id: id });
    res.send(true);
  } catch (error) {
    res.send(false);
  }
});

export default router;

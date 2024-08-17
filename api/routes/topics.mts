import express from "express";
import TopicModel from "../models/topic.mjs";
const router = express.Router();
router.get("/", async (req, res) => {
  const topics = await TopicModel.find();
  res.send(topics);
});
router.post("/create", async (req, res) => {
  const topic = req.body;
  const result = await TopicModel.create(topic);
  res.send(result);
});
router.post("/createmany", async (req, res) => {
  const topics = req.body;
  const result = await TopicModel.create(topics);
  res.send(result);
});
export default router;

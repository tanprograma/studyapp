import express from "express";
import SubjectModel from "../models/subject.mjs";
const router = express.Router();
router.get("/", async (req, res) => {
  const subjects = await SubjectModel.find();
  res.send(subjects);
});
router.post("/create", async (req, res) => {
  const subject = req.body;
  const result = await SubjectModel.create(subject);
  res.send(result);
});
router.post("/createmany", async (req, res) => {
  const subjects = req.body;
  console.log(subjects);
  const result = await SubjectModel.create(subjects);
  res.send(result);
});
export default router;

import express from 'express';
import MarkModel from '../models/result';
const router = express.Router();
router.get('/', async (req, res) => {
  const examResults = await MarkModel.find();
  res.send(examResults);
});
router.get('/:id', async (req, res) => {
  const _id = req.params.id;

  const examResult = await MarkModel.findOne({ _id });

  res.send(examResult);
});
router.post('/create', async (req, res) => {
  const examResult = req.body;
  const result = await MarkModel.create(examResult);
  res.send(result);
});
// router.post('/mark/:id', async (req, res) => {
//   const _id = req.params.id;
//   const before = await MarkModel.findOne({ _id });
//   if (before != null) {
//     before.questions = req.body.questions;
//     before.marked = req.body.marked;
//     const after = await before.save();
//     res.send(after);
//   }

// });

export default router;

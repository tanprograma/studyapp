import express from 'express';
import McqModel from '../models/mcq';
const router = express.Router();
router.get('/', async (req, res) => {
  const exams = await McqModel.find();
  res.send(exams);
});
router.get('/:id', async (req, res) => {
  const _id = req.params.id;

  const exam = await McqModel.findOne({ _id });

  res.send(exam);
});
router.post('/create', async (req, res) => {
  const exam = req.body;
  const result = await McqModel.create(exam);
  res.send(result);
});

router.post('/createmany', async (req, res) => {
  const exams = req.body;
  const result = await McqModel.create(exams);
  res.send(result);
});
export default router;

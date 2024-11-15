import express from 'express';
import ExamModel from '../models/exam';
const router = express.Router();
router.get('/', async (req, res) => {
  const exams = await ExamModel.find();
  res.send(exams);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const exam = await ExamModel.findOne({ _id: id });
  res.send(exam);
});
router.get('/preview', async (req, res) => {
  const exams = await ExamModel.find();
  res.send(
    exams.map(({ _id, book, topic, questions }) => ({
      _id,
      book,
      topic,
      questions: questions.length,
    }))
  );
});
router.post('/', async (req, res) => {
  const exam = req.body;
  const result = await ExamModel.create(exam);
  res.send(result);
});
router.delete('/:id', async (req, res) => {
  try {
    const exam = req.params.id;
    const result = await ExamModel.create({ _id: exam });
    res.send(true);
  } catch (error) {
    res.send(false);
  }
});

export default router;

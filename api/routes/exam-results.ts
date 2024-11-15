import express from 'express';
import Model from '../models/exam-result';
const router = express.Router();
router.get('/', async (req, res) => {
  // get all exam results
  const questions = await Model.find();
  res.send(questions);
});
router.get('/:id', async (req, res) => {
  // get just one item
  const id = req.params.id;
  const exam = await Model.findOne({ _id: id });
  res.send(exam);
});
router.get('/preview', async (req, res) => {
  // get all exam previews
  const questions = await Model.find();
  res.send(
    questions.map(({ _id, book, topic, questions }) => ({
      _id,
      book,
      topic,
      questions: questions.length,
    }))
  );
});

router.delete('/:id', async (req, res) => {
  // deletes the result
  try {
    const question = req.params.id;
    const result = await Model.create({ _id: question });
    res.send(true);
  } catch (error) {
    res.send(false);
  }
});
router.post('/', async (req, res) => {
  const question = req.body;
  const result = await Model.create(question);
  res.send(result);
});

export default router;

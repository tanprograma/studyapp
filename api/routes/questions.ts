import express from 'express';
import QuestionModel from '../models/question';
const router = express.Router();
router.get('/', async (req, res) => {
  const questions = await QuestionModel.find();
  res.send(questions);
});
router.get('/:id', async (req, res) => {
  const subtopicID = req.params.id;

  const questions = await QuestionModel.find().where({
    subtopicID: subtopicID,
  });

  res.send(questions);
});
router.post('/create', async (req, res) => {
  const question = req.body;
  const result = await QuestionModel.create(question);
  res.send(result);
});
router.post('/createmany', async (req, res) => {
  const questions = req.body;
  const result = await QuestionModel.create(questions);
  res.send(result);
});
export default router;

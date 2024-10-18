import express from 'express';
import MarkModel from '../models/result';
import ExamModel from '../models/mcq';
const router = express.Router();
router.get('/', async (req, res) => {
  res.send('sanitize working very well indeed');
});
router.get('/exams', async (req, res) => {
  let examResults = await MarkModel.find();
  const modified = [];
  for (let item of examResults) {
    item.questions = cleanQuestions(item.questions);
    const mod = await item.save();
    modified.push(mod);
  }
  res.send(modified);
});
router.get('/mcqs', async (req, res) => {
  let examResults = await ExamModel.find();
  const modified = [];
  for (let item of examResults) {
    item.questions = cleanQuestions(item.questions);
    const mod = await item.save();
    modified.push(mod);
  }
  res.send(modified);
});

function cleanQuestions(questions: any) {
  return questions.map((question: any) => {
    return {
      qn: question.qn,
      type: question.type,
      options: cleanOptions(question.options),
    };
  });
}
function cleanOptions(items: any) {
  return items.map((item: any) => {
    return {
      option: item.option,
      selected: item.selected,
      isAnswer: item.isAnswer,
    };
  });
}

export default router;

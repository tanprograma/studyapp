import express from 'express';
import StudyModel from '../models/studyqn';
const router = express.Router();
router.get('/', async (req, res) => {
  const queryParams = req.query;
  const qns = await StudyModel.find(queryParams);
  res.send(qns);
});

router.post('/', async (req, res) => {
  const qn = req.body;
  const result = await StudyModel.create(qn);
  res.send(result);
});
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await StudyModel.findOneAndDelete({ _id: id });
    res.send(true);
  } catch (error) {
    false;
  }
});

export default router;

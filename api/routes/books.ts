import express from 'express';
import BookModel from '../models/book';
const router = express.Router();
router.get('/', async (req, res) => {
  const subjects = await BookModel.find();
  res.send(subjects);
});
router.post('/', async (req, res) => {
  const subject = req.body;
  const result = await BookModel.create(subject);
  res.send(result);
});
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await BookModel.findOneAndDelete({ _id: id });
    res.send(true);
  } catch (error) {
    false;
  }
});

export default router;

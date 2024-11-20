import express from 'express';
import JournalModel from '../models/journal';
const router = express.Router();
router.get('/', async (req, res) => {
  const notes = await JournalModel.find();
  res.send(notes);
});

router.post('/', async (req, res) => {
  // creates note
  const note = req.body;
  const result = await JournalModel.create(note);
  res.send(result);
});
router.delete('/:id', async (req, res) => {
  // creates note
  try {
    const id = req.params.id;
    const result = await JournalModel.findByIdAndDelete({ _id: id });
    res.send(true);
  } catch (error) {
    res.send(false);
  }
});
// update note
router.post('/:id', async (req, res) => {
  const id = req.params.id;
  const original = await JournalModel.findOne({ _id: id });

  if (!!original) {
    original.title = req.body.title;
    await original.save();
    res.send(true);
  } else {
    res.send(false);
  }
});

export default router;

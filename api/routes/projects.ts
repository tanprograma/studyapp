import express from 'express';
import ProjectModel from '../models/project';
const router = express.Router();
router.get('/', async (req, res) => {
  const todos = await ProjectModel.find();
  res.send(todos);
});

router.post('/', async (req, res) => {
  const item = req.body;
  const result = await ProjectModel.create(item);
  res.send(result);
});
router.delete('/:id', async (req, res) => {
  try {
    const item = req.params.id;
    const result = await ProjectModel.findOneAndDelete({ _id: item });
    res.send(true);
  } catch (error) {
    res.send(false);
  }
});
// patches the record
router.put('/:id', async (req, res) => {
  const id = req.body._id;
  const original = await ProjectModel.findOne({ _id: id });

  if (!!original) {
    original.completed = true;
    await original.save();
    res.send(true);
  } else {
    res.send(false);
  }
});
router.patch('/:id', async (req, res) => {
  const id = req.body._id;
  const original = await ProjectModel.findOne({ _id: id });

  if (!!original) {
    original.completed = !original.completed;
    await original.save();
    res.send(true);
  } else {
    res.send(false);
  }
});

export default router;

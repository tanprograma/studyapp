import express from 'express';
import TodoModel from '../models/todo';
const router = express.Router();
router.get('/', async (req, res) => {
  // const todos = await TodoModel.find(req.query);
  // res.send(todos);
  const todos = await TodoModel.find();
  res.send(todos);
});

router.post('/', async (req, res) => {
  const todo = req.body;
  const result = await TodoModel.create(todo);
  res.send(result);
});
router.delete('/:id', async (req, res) => {
  // delete todo
  try {
    const todo = req.params.id;
    const result = await TodoModel.findOneAndDelete({ _id: todo });
    res.send(true);
  } catch (error) {
    res.send(false);
  }
});
// patches the record
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const completed = req.body.completed as boolean;
  const original = await TodoModel.findOne({ _id: id });

  if (!!original) {
    original.completed = completed;
    await original.save();
    res.send(true);
  } else {
    res.send(false);
  }
});
router.patch('/:id', async (req, res) => {
  const id = req.params.id;

  const original = await TodoModel.findOne({ _id: id });

  if (!!original) {
    original.completed = !original.completed;
    await original.save();
    res.send(true);
  } else {
    res.send(false);
  }
});

export default router;

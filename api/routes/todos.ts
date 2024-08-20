import express from 'express';
import TodoModel from '../models/todo';
const router = express.Router();
router.get('/', async (req, res) => {
  const todos = await TodoModel.find();
  res.send(todos);
});
router.get('/:createdAt', async (req, res) => {
  const createdAt = new Date(req.params.createdAt).toISOString();

  const todos = await TodoModel.find().where({ createdAt: createdAt });

  res.send(todos);
});
router.post('/create', async (req, res) => {
  const todo = req.body;
  const result = await TodoModel.create(todo);
  res.send(result);
});
router.post('/complete', async (req, res) => {
  const _id = req.body._id;
  const original = await TodoModel.findOne({ _id });
  let result;
  if (original != null) {
    original.completed = true;
    result = await original.save();
  }
  res.send(result);
});
router.post('/createmany', async (req, res) => {
  const todos = req.body;
  const result = await TodoModel.create(todos);
  res.send(result);
});
export default router;

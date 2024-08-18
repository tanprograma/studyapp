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
router.post('/createmany', async (req, res) => {
  const todos = req.body;
  const result = await TodoModel.create(todos);
  res.send(result);
});
export default router;

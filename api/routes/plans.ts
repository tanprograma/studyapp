import express from 'express';
import PlanModel from '../models/plan';
const router = express.Router();
router.get('/', async (req, res) => {
  const todos = await PlanModel.find();
  res.send(todos);
});

router.post('/', async (req, res) => {
  const item = req.body;
  const result = await PlanModel.create(item);
  res.send(result);
});
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await PlanModel.findOneAndDelete({ _id: id });
    res.send(true);
  } catch (error) {
    res.send(false);
  }
});
// patches the record
router.patch('/:id', async (req, res) => {
  // toggles complete state
  const id = req.body._id;
  const original = await PlanModel.findOne({ _id: id });

  if (!!original) {
    original.completed = true;
    await original.save();
    res.send(true);
  } else {
    res.send(false);
  }
});

export default router;

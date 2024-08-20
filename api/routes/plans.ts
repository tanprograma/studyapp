import express from 'express';
import PlanModel from '../models/plan';
const router = express.Router();
router.get('/', async (req, res) => {
  const plans = await PlanModel.find();
  res.send(plans);
});
router.get('/:createdAt', async (req, res) => {
  const createdAt = new Date(req.params.createdAt).toISOString();

  const plans = await PlanModel.find().where({ createdAt: createdAt });

  res.send(plans);
});
router.post('/create', async (req, res) => {
  const plan = req.body;
  const result = await PlanModel.create(plan);
  res.send(result);
});
router.post('/complete', async (req, res) => {
  const _id = req.body._id;
  const original = await PlanModel.findOne({ _id });
  let result;
  if (original != null) {
    original.completed = true;
    result = await original.save();
  }
  res.send(result);
});
router.post('/createmany', async (req, res) => {
  const plans = req.body;
  const result = await PlanModel.create(plans);
  res.send(result);
});
export default router;

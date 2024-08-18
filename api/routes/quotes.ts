import express from 'express';
import QuoteModel from '../models/quote';
const router = express.Router();
router.get('/', async (req, res) => {
  const quotes = await QuoteModel.find();
  res.send(quotes);
});
router.post('/create', async (req, res) => {
  const quote = req.body;
  const result = await QuoteModel.create(quote);
  res.send(result);
});
router.post('/createmany', async (req, res) => {
  const quotes = req.body;
  console.log(quotes);
  const result = await QuoteModel.create(quotes);
  res.send(result);
});
export default router;

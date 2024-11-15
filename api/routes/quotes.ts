import express from 'express';
import QuoteModel from '../models/quote';
const router = express.Router();
router.get('/', async (req, res) => {
  const quotes = await QuoteModel.find();
  res.send(quotes);
});
router.post('/', async (req, res) => {
  const quote = req.body;
  const result = await QuoteModel.create(quote);
  res.send(result);
});
router.delete('/:id', async (req, res) => {
  try {
    const quote = req.params.id;
    const result = await QuoteModel.findOneAndDelete({ _id: quote });
    res.send(true);
  } catch (error) {
    res.send(false);
  }
});

export default router;

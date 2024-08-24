import express from 'express';
import ArticleModel from '../models/article';
const router = express.Router();
router.get('/', async (req, res) => {
  const articles = await ArticleModel.find();
  res.send(articles);
});
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const article = await ArticleModel.findOne({ _id: id });
  res.send(article);
});
router.post('/create', async (req, res) => {
  const article = req.body;
  const result = await ArticleModel.create(article);
  res.send(result);
});

export default router;

import express from 'express';
import ArticleModel from '../models/article';
const router = express.Router();
router.get('/', async (req, res) => {
  // get all articles
  const articles = await ArticleModel.find();
  res.send(articles);
});
router.get('/article/:id', async (req, res) => {
  // get specific or one article
  const id = req.params.id;
  const article = await ArticleModel.findOne({ _id: id });
  res.send(article);
});
router.get('/preview', async (req, res) => {
  // get all articles previews
  const articles = await ArticleModel.find();
  res.send(
    articles.map(({ _id, title, createdAt }) => ({ _id, title, createdAt }))
  );
});
router.post('/', async (req, res) => {
  // creates article(s)
  const article = req.body;
  const result = await ArticleModel.create(article);
  res.send(result);
});
router.delete('/:id', async (req, res) => {
  // creates article(s)
  try {
    const id = req.params.id;
    const result = await ArticleModel.findByIdAndDelete({ _id: id });
    res.send(true);
  } catch (error) {
    false;
  }
});

export default router;

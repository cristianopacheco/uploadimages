const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

const Post = require('./model/Post');

routes.get('/posts', async (req, res) => {
  const posts = await Post.find({});
  return res.json(posts);
});

routes.post('/posts', multer(multerConfig).single('file'), async (req, res) => {
  const post = await Post.create({
    name: req.file.originalname,
    size: req.file.size,
    key: req.file.key,
    url: req.file.location || ''
  });

  return res.json(post);
});

routes.delete('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    await post.remove();
    return res.send(204);
  }

  return res.send(404);
});

module.exports = routes;

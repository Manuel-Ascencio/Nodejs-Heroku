const express = require('express');

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePostPut,
  updatePostPatch,
  deletePost
} = require('../controllers/posts.controller');

const router = express.Router();

router.get('/', getAllPosts);

router.get('/:id', getPostById);

router.post('/', createPost);

router.put('/:id', updatePostPut);

router.patch('/:id', updatePostPatch);

router.delete('/:id', deletePost);

module.exports = { postsRouter: router };

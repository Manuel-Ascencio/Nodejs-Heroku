const { Post } = require('../models/post.model');

const { filterObj } = require('../util/filterObj');
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.findAll({ where: { status: 'active' } });

  res.status(200).json({
    status: 'success',
    data: {
      posts
    }
  });
});

exports.getPostById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findOne({
    where: { id: id, status: 'active' }
  });

  if (!post) {
    return next(new AppError(404, 'No post found with the given ID'));
  }

  res.status(200).json({
    status: 'success',
    data: {
      post
    }
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const { title, content, userId } = req.body;

  if (!title || !content || !userId) {
    return next(
      new AppError(400, 'Must provide a valid title, content and userId')
    );
  }
  const newPost = await Post.create({
    title: title,
    content: content,
    userId: userId
  });

  res.status(201).json({
    status: 'success',
    data: { newPost }
  });
});

exports.updatePostPut = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  if (
    !title ||
    !content ||
    !author ||
    title.length === 0 ||
    content.length === 0 ||
    author.length === 0
  ) {
    return next(
      new AppError(
        400,
        'Must provide a title, content and the author for this request'
      )
    );
  }

  const post = await Post.findOne({
    where: { id: id, status: 'active' }
  });

  if (!post) {
    res.status(404).json({
      status: 'error',
      message: 'Cant update post, invalid ID'
    });
    return;
  }

  await post.update({
    title: title,
    content: content,
    author: author
  });

  res.status(204).json({ status: 'success' });
});

exports.updatePostPatch = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = filterObj(req.body, 'title', 'content', 'author');

  const post = await Post.findOne({
    where: { id: id, status: 'active' }
  });

  if (!post) {
    return next(new AppError(404, 'Cant update post, invalid ID'));
  }

  await post.update({ ...data });

  res.status(204).json({ status: 'success' });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findOne({
    where: { id: id, status: 'active' }
  });

  if (!post) {
    return next(new AppError(404, 'Cant delete post, invalid ID'));
  }

  await post.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});

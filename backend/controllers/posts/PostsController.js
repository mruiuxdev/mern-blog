const asyncHandler = require("express-async-handler");
const filterBadWords = require("bad-words");
const path = require("path");
const fs = require("fs");
const validateMongoDBId = require("../../utils/validateMongoDBId");
const Post = require("../../models/post/PostModel");
const User = require("../../models/user/UserModel");
const cloudinaryUploadImg = require("../../utils/cloudinary");

const createPost = asyncHandler(async (req, res, next) => {
  const { _id, isBlocked } = req.user;

  const { title, category, description } = req.body;

  const filter = new filterBadWords();

  const isProfane = filter.isProfane(title, description);

  validateMongoDBId(_id);

  if (isBlocked) {
    return res.json(
      "You is blocked before, Contact support blog@support.com to unblock your account"
    );
  }

  if (isProfane) {
    await User.findByIdAndUpdate(_id, { isBlocked: true }, { new: true });

    return res.json(
      "Creating failed because it contains profane words and you have been blocked"
    );
  } else {
    try {
      const localPath = path.join(
        `public/images/posts/${req.file && req.file.filename}`
      );

      const imgUploaded = await cloudinaryUploadImg(localPath);

      const post = await Post.create({
        title,
        category,
        user: _id,
        description,
        image: imgUploaded ? imgUploaded.url : image,
      });

      if (req.file !== undefined) fs.unlinkSync(localPath);

      res.json(post);
    } catch (err) {
      next(err);
    }
  }
});

const posts = asyncHandler(async (req, res, next) => {
  const hasCategory = req.query.category;

  try {
    if (hasCategory) {
      const posts = await Post.find({ category: hasCategory })
        .populate("user")
        .sort("-createdAt");

      res.json(posts);
    } else {
      const posts = await Post.find({}).populate("user").sort("-createdAt");

      res.json(posts);
    }
  } catch (err) {
    next(err);
  }
});

const postId = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;

  validateMongoDBId(postId);

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $inc: { numOfViews: 1 } },
      { new: true }
    )
      .populate("user")
      .populate("likes")
      .populate("dislikes");

    res.json(post);
  } catch (err) {
    next(err);
  }
});

const updatePost = asyncHandler(async (req, res, next) => {
  const { _id, isBlocked } = req.user;

  const { title, category, description } = req.body;

  const { postId } = req.params;

  const filter = new filterBadWords();

  const isProfane = filter.isProfane(title, description);

  validateMongoDBId(postId);

  validateMongoDBId(_id);

  if (isBlocked) {
    return res.json(
      "You is blocked before, Contact support blog@support.com to unblock your account"
    );
  }

  if (isProfane) {
    await User.findByIdAndUpdate(postId, { isBlocked: true }, { new: true });

    return res.json(
      "Creating failed because it contains profane words and you have been blocked"
    );
  } else {
    try {
      const localPath = path.join(
        `public/images/posts/${req.file && req.file.filename}`
      );

      const imgUploaded = await cloudinaryUploadImg(localPath);

      const post = await Post.findByIdAndUpdate(
        postId,
        {
          title,
          category,
          user: _id,
          description,
          image: imgUploaded ? imgUploaded.url : image,
        },
        { new: true, runValidators: true }
      );

      if (req.file !== undefined) fs.unlinkSync(localPath);

      res.json(post);
    } catch (err) {
      next(err);
    }
  }
});

const deletePost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;

  validateMongoDBId(postId);

  try {
    await Post.findByIdAndDelete(postId);

    res.json("Post deleted");
  } catch (err) {
    next(err);
  }
});

const like = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;

  const { _id } = req.user;

  validateMongoDBId(postId);

  const post = await Post.findById(postId);

  const isAlreadyDisliked = post.dislikes.find(
    (user) => user.toString() === _id.toString()
  );

  const isLiked = post.isLiked;

  try {
    if (isAlreadyDisliked) {
      const post = await Post.findByIdAndUpdate(
        postId,
        { $pull: { dislikes: _id }, isDisliked: false },
        { new: true }
      );

      return res.json(post);
    }

    if (isLiked) {
      const post = await Post.findByIdAndUpdate(
        postId,
        { $pull: { likes: _id }, isLiked: false },
        { new: true }
      );

      return res.json(post);
    } else {
      const post = await Post.findByIdAndUpdate(
        postId,
        { $push: { likes: _id }, isLiked: true },
        { new: true }
      );

      return res.json(post);
    }
  } catch (err) {
    next(err);
  }
});

const dislike = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;

  const { _id } = req.user;

  validateMongoDBId(postId);

  const post = await Post.findById(postId);

  const isAlreadyLiked = post.likes.find(
    (user) => user.toString() === _id.toString()
  );

  const isDisliked = post.isDisliked;

  try {
    if (isAlreadyLiked) {
      const post = await Post.findByIdAndUpdate(
        postId,
        { $pull: { likes: _id }, isLiked: false },
        { new: true }
      );

      return res.json(post);
    }

    if (isDisliked) {
      const post = await Post.findByIdAndUpdate(
        postId,
        { $pull: { dislikes: _id }, isDisliked: false },
        { new: true }
      );

      return res.json(post);
    } else {
      const post = await Post.findByIdAndUpdate(
        postId,
        { $push: { dislikes: _id }, isDisliked: true },
        { new: true }
      );

      return res.json(post);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = {
  createPost,
  posts,
  postId,
  updatePost,
  deletePost,
  like,
  dislike,
};

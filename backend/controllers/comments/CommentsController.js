const asyncHandler = require("express-async-handler");
const Comment = require("../../models/comment/CommentModel");
const validateMongoDBId = require("../../utils/validateMongoDBId");

const createComment = asyncHandler(async (req, res, next) => {
	const { postId } = req.params;

	const { _id } = req.user;

	const { description } = req.body;

	validateMongoDBId(postId);

	validateMongoDBId(_id);

	try {
		const comment = await Comment.create({
			post: postId,
			user: _id,
			description,
		});

		res.json(comment);
	} catch (err) {
		next(err);
	}
});

const comments = asyncHandler(async (req, res, next) => {
	const { postId } = req.params;

	validateMongoDBId(postId);

	try {
		const comments = await Comment.find({ post: postId }).sort("-createdAt");

		res.json(comments);
	} catch (err) {
		next(err);
	}
});

const comment = asyncHandler(async (req, res, next) => {
	const { commentId } = req.params;

	validateMongoDBId(commentId);

	try {
		const comment = await Comment.findById(commentId)
			.populate("user")
			.populate("post");

		res.json(comment);
	} catch (err) {
		next(err);
	}
});

const updateComment = asyncHandler(async (req, res, next) => {
	const { commentId } = req.params;

	const { description } = req.body;

	validateMongoDBId(commentId);

	try {
		const comment = await Comment.findByIdAndUpdate(
			commentId,
			{ description },
			{ new: true, runValidators: true }
		);

		res.json(comment);
	} catch (err) {
		next(err);
	}
});

const deleteComment = asyncHandler(async (req, res, next) => {
	const { commentId } = req.params;

	validateMongoDBId(commentId);

	try {
		await Comment.findOneAndDelete(commentId);

		res.json("Comment deleted");
	} catch (err) {
		next(err);
	}
});

module.exports = {
	createComment,
	comments,
	comment,
	updateComment,
	deleteComment,
};

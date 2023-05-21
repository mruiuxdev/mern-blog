const express = require("express");
const auth = require("../middleware/auth/auth");
const {
	createComment,
	comment,
	comments,
	updateComment,
	deleteComment,
} = require("../controllers/comments/CommentsController");

const router = express.Router();

router.route("/post/:postId/comment").post(auth, createComment);
router.route("/post/:postId/comments").get(auth, comments);
router.route("/post/comment/:commentId").get(auth, comment);
router.route("/post/comment/:commentId").put(auth, updateComment);
router.route("/post/comment/:commentId").delete(auth, deleteComment);

module.exports = router;

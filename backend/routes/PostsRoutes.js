const express = require("express");
const auth = require("../middleware/auth/auth");
const {
	createPost,
	posts,
	postId,
	updatePost,
	deletePost,
	like,
	dislike,
} = require("../controllers/posts/PostsController");
const {
	photoUploader,
	postPhotoResize,
} = require("../middleware/uploads/photoUploader");

const router = express.Router();

router
	.route("/post")
	.post(auth, photoUploader.single("image"), postPhotoResize, createPost);
router.route("/posts").get(posts);
router.route("/post/:postId").get(postId);
router
	.route("/post/:postId")
	.put(auth, photoUploader.single("image"), postPhotoResize, updatePost);
router.route("/post/:postId").delete(auth, deletePost);
router.route("/post/like/:postId").put(auth, like);
router.route("/post/dislike/:postId").put(auth, dislike);

module.exports = router;

const express = require("express");
const auth = require("../middleware/auth/auth");
const {
	photoUploader,
	profilePhotoResize,
} = require("../middleware/uploads/photoUploader");
const {
	register,
	login,
	users,
	deleteUser,
	userId,
	profile,
	updateProfile,
	updatePassword,
	follow,
	unFollow,
	block,
	unblock,
	sendVerifyToken,
	accountVerification,
	sendResetPasswordToken,
	resetPassword,
	profilePhotoUpload,
} = require("../controllers/users/UsersController");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/users").get(auth, users);
router.route("/user/:userId").get(userId);
router.route("/user/:userId").delete(deleteUser);
router.route("/profile/:userId").get(auth, profile);
router.route("/profile/:userId").put(auth, updateProfile);
router.route("/password").put(auth, updatePassword);
router.route("/follow").put(auth, follow);
router.route("/unfollow").put(auth, unFollow);
router.route("/block/:userId").put(auth, block);
router.route("/unblock/:userId").put(auth, unblock);
router.route("/send-verify-token").post(auth, sendVerifyToken);
router.route("/verify-account").put(auth, accountVerification);
router.route("/reset-password-token").post(auth, sendResetPasswordToken);
router.route("/reset-password").put(auth, resetPassword);
router
	.route("/profile-photo")
	.put(
		auth,
		photoUploader.single("image"),
		profilePhotoResize,
		profilePhotoUpload
	);

module.exports = router;

const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const User = require("../../models/user/UserModel");
const generateToken = require("../../config/token/generateToken");
const validateMongoDBId = require("../../utils/validateMongoDBId");
const sendMail = require("../../config/sendGrid/sendGrid");
const cloudinaryUploadImg = require("../../utils/cloudinary");

const register = asyncHandler(async (req, res, next) => {
	const { firstName, lastName, email, password } = req.body;

	try {
		const isUserExists = await User.findOne({ email });

		if (isUserExists) throw new Error("User already exists");

		const user = await User.create({
			firstName,
			lastName,
			email,
			password,
		});

		res.json(user);
	} catch (err) {
		next(err);
	}
});

const login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const isUserExists = await User.findOne({ email }).select("+password");

		if (isUserExists && (await isUserExists.isPasswordMatched(password))) {
			return res.json({
				_id: isUserExists._id,
				firstName: isUserExists.firstName,
				lastName: isUserExists.lastName,
				email: isUserExists.email,
				profilePhoto: isUserExists.profilePhoto,
				isAdmin: isUserExists.isAdmin,
				token: generateToken(isUserExists._id),
			});
		} else {
			res.status(401);

			throw new Error("Login credentials not valid");
		}
	} catch (err) {
		next(err);
	}
});

const users = asyncHandler(async (req, res, next) => {
	try {
		const users = await User.find().sort("-createdAt");

		res.json(users);
	} catch (err) {
		next(err);
	}
});

const deleteUser = asyncHandler(async (req, res, next) => {
	const { userId } = req.params;

	validateMongoDBId(userId);

	try {
		await User.findByIdAndDelete(userId);

		res.json("Deleted");
	} catch (err) {
		next(err);
	}
});

const userId = asyncHandler(async (req, res, next) => {
	const { userId } = req.params;

	validateMongoDBId(userId);

	try {
		const user = await User.findById(userId);

		res.json(user);
	} catch (err) {
		next(err);
	}
});

const profile = asyncHandler(async (req, res, next) => {
	const { userId } = req.params;

	validateMongoDBId(userId);

	try {
		const user = await User.findById(userId).populate("posts");

		res.json(user);
	} catch (err) {
		next(err);
	}
});

const updateProfile = asyncHandler(async (req, res, next) => {
	const { userId } = req.params;

	const { firstName, lastName, bio, email } = req.body;

	validateMongoDBId(userId);

	try {
		const user = await User.findByIdAndUpdate(
			userId,
			{ firstName, lastName, bio, email },
			{ new: true, runValidators: true }
		);

		res.json(user);
	} catch (err) {
		next(err);
	}
});

const updatePassword = asyncHandler(async (req, res, next) => {
	const { _id } = req.user;

	const { oldPassword, newPassword } = req.body;

	validateMongoDBId(_id);

	try {
		const user = await User.findById(_id).select("+password");

		const isPasswordMatched = await user.isPasswordMatched(oldPassword);

		if (!isPasswordMatched) throw new Error("Old password is incorrect");

		if (oldPassword === newPassword)
			throw new Error("New password cannot be the same as the old password");

		user.password = newPassword;

		const passwordUpdated = await user.save();

		res.json(passwordUpdated);
	} catch (err) {
		next(err);
	}
});

const follow = asyncHandler(async (req, res, next) => {
	const { followerUserId } = req.body;

	const { _id } = req.user;

	validateMongoDBId(_id);

	try {
		const followerUser = await User.findById(followerUserId);

		const isAlreadyFollowing = followerUser.followers.find(
			(id) => id.toString() === _id.toString()
		);

		if (!isAlreadyFollowing) {
			await User.findByIdAndUpdate(
				followerUserId,
				{
					$push: { followers: _id },
					isFollowing: true,
				},
				{ new: true }
			);

			await User.findByIdAndUpdate(
				_id,
				{
					$push: { following: followerUserId },
				},
				{ new: true }
			);

			return res.json("You follow this user");
		} else {
			return res.json("You already follow this user");
		}
	} catch (err) {
		next(err);
	}
});

const unFollow = asyncHandler(async (req, res, next) => {
	const { followerUserId } = req.body;

	const { _id } = req.user;

	validateMongoDBId(_id);

	try {
		const followerUser = await User.findById(followerUserId);

		validateMongoDBId(followerUserId);

		const isAlreadyFollowing = followerUser.followers.find(
			(id) => id.toString() === _id.toString()
		);

		if (isAlreadyFollowing) {
			await User.findByIdAndUpdate(
				followerUserId,
				{
					$pull: { followers: _id },
					isFollowing: false,
				},
				{ new: true }
			);

			await User.findByIdAndUpdate(
				_id,
				{
					$pull: { following: followerUserId },
				},
				{ new: true }
			);

			return res.json("You cancel following this user");
		} else {
			return res.json("You already not follow this user");
		}
	} catch (err) {
		next(err);
	}
});

const block = asyncHandler(async (req, res, next) => {
	const { userId } = req.params;

	const { isAdmin } = req.user;

	validateMongoDBId(userId);

	if (!isAdmin) throw new Error("You not allow to block user");

	try {
		const user = await User.findByIdAndUpdate(
			userId,
			{ isBlocked: true },
			{ new: true }
		);

		res.json(user);
	} catch (err) {
		next(err);
	}
});

const unblock = asyncHandler(async (req, res, next) => {
	const { userId } = req.params;

	const { isAdmin } = req.user;

	validateMongoDBId(userId);

	if (!isAdmin) throw new Error("You not allow to unblock user");

	try {
		const user = await User.findByIdAndUpdate(
			userId,
			{ isBlocked: false },
			{ new: true }
		);

		res.json(user);
	} catch (err) {
		next(err);
	}
});

const sendVerifyToken = asyncHandler(async (req, res, next) => {
	const { _id } = req.user;

	try {
		const user = await User.findById(_id);

		validateMongoDBId(_id);

		const verificationToken = await user.createAccountVerificationToken();

		const emailTemplate = `
		If your were requested to verify your account, verify now within 10 minutes, otherwise ignore this message <a href="http://localhost:3000/verify-account/${verificationToken}">Click here to verify</a>
		`;

		await user.save();

		sendMail(
			process.env.SENDGRID_API_FROM,
			"mohamedramadan8893@gmail.com",
			"Verify your account",
			emailTemplate
		);

		res.json(emailTemplate);
	} catch (err) {
		next(err);
	}
});

const accountVerification = asyncHandler(async (req, res, next) => {
	const { token } = req.body;

	const hashToken = crypto.createHash("sha256").update(token).digest("hex");

	try {
		const user = await User.findOne({
			accountVerificationToken: hashToken,
			accountVerificationTokenExpires: { $gt: new Date() },
		});

		if (!user) throw new Error("Token expires, try again later");

		user.isAccountVerified = true;
		user.accountVerificationToken = undefined;
		user.accountVerificationTokenExpires = undefined;

		await user.save();

		res.json(user);
	} catch (err) {
		next(err);
	}
});

const sendResetPasswordToken = asyncHandler(async (req, res, next) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) throw new Error("User not found");

		const resetPasswordToken = await user.createResetPasswordToken();

		const emailTemplate = `
			If your were requested to reset your password, reset now within 10 minutes, otherwise ignore this message <a href="http://localhost:3000/reset-password/${resetPasswordToken}">Click here to reset</a>
			`;

		await user.save();

		sendMail(
			process.env.SENDGRID_API_FROM,
			"mohamedramadan8893@gmail.com",
			"Reset Password",
			emailTemplate
		);

		res.json(emailTemplate);
	} catch (err) {
		next(err);
	}
});

const resetPassword = asyncHandler(async (req, res, next) => {
	const { token, password } = req.body;

	const hashToken = crypto.createHash("sha256").update(token).digest("hex");

	try {
		const user = await User.findOne({
			resetPasswordToken: hashToken,
			resetPasswordTokenExpires: { $gt: new Date() },
		});

		if (!user) throw new Error("Token expires, try again later");

		user.resetPasswordToken = undefined;
		user.resetPasswordTokenExpires = undefined;
		user.password = password;

		await user.save();

		res.json(user);
	} catch (err) {
		next(err);
	}
});

const profilePhotoUpload = asyncHandler(async (req, res) => {
	const { _id } = req.user;

	const localPath = path.join(`public/images/profile/${req.file.filename}`);

	validateMongoDBId(_id);

	try {
		const imgUploaded = await cloudinaryUploadImg(localPath);

		const user = await User.findByIdAndUpdate(
			_id,
			{ profilePhoto: imgUploaded.url },
			{ new: true }
		);

		fs.unlinkSync(localPath);

		res.json(user);
	} catch (err) {
		next(err);
	}
});

module.exports = {
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
};

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "First name is required"],
		},
		lastName: {
			type: String,
			required: [true, "Last name is required"],
		},
		profilePhoto: {
			type: String,
			default:
				"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
		},
		email: {
			type: String,
			required: [true, "Email is required"],
		},
		bio: {
			type: String,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			select: false,
		},
		postCount: {
			type: Number,
			default: 0,
		},
		isBlocked: {
			type: Boolean,
			default: false,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		role: {
			type: String,
			enum: ["Admin", "Guest", "Blogger"],
		},
		isFollowing: {
			type: Boolean,
			default: false,
		},
		isUnFollowing: {
			type: Boolean,
			default: false,
		},
		isAccountVerified: {
			type: Boolean,
			default: false,
		},
		accountVerificationToken: {
			type: String,
		},
		accountVerificationTokenExpires: {
			type: Date,
		},
		viewedBy: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
			],
		},
		followers: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
			],
		},
		following: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
			],
		},
		passwordChangeAt: {
			type: Date,
		},
		resetPasswordToken: {
			type: String,
		},
		resetPasswordTokenExpires: {
			type: Date,
		},
		active: {
			type: Boolean,
			default: false,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		id: {
			type: mongoose.Schema.Types.ObjectId,
			select: false,
		},
	},
	{ timestamps: true }
);

userSchema.virtual("posts", {
	ref: "Post",
	foreignField: "user",
	localField: "_id",
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) next();

	const salt = await bcrypt.genSalt(10);

	this.password = await bcrypt.hash(this.password, salt);

	next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createAccountVerificationToken = async function () {
	const verificationToken = crypto.randomBytes(32).toString("hex");

	this.accountVerificationToken = crypto
		.createHash("sha256")
		.update(verificationToken)
		.digest("hex");

	this.accountVerificationTokenExpires = Date.now() + 30 * 60 * 1000;

	return verificationToken;
};

userSchema.methods.createResetPasswordToken = async function () {
	const resetPasswordToken = crypto.randomBytes(32).toString("hex");

	this.resetPasswordToken = crypto
		.createHash("sha256")
		.update(resetPasswordToken)
		.digest("hex");

	this.resetPasswordTokenExpires = Date.now() + 30 * 60 * 1000;

	return resetPasswordToken;
};

userSchema.set("toObject", { virtuals: true });

userSchema.set("toJSON", { virtuals: true });

const User = mongoose.model("User", userSchema);

module.exports = User;

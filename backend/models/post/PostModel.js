const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
			trim: true,
		},
		category: {
			type: String,
			required: [true, "Post category is required"],
			default: "All",
		},
		isLiked: {
			type: Boolean,
			default: false,
		},
		isDisliked: {
			type: Boolean,
			default: false,
		},
		numOfViews: {
			type: Number,
			default: 0,
		},
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		dislikes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Author is required"],
		},
		description: {
			type: String,
			required: [true, "Post description is required"],
		},
		image: {
			type: String,
			default: "https://welc.ie/wp-content/uploads/2018/01/placeholder-1.png",
		},
		id: {
			type: mongoose.Schema.Types.ObjectId,
			select: false,
		},
	},
	{ timestamps: true }
);

postSchema.set("toObject", { virtuals: true });

postSchema.set("toJSON", { virtuals: true });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		id: {
			type: mongoose.Schema.Types.ObjectId,
			select: false,
		},
	},
	{ timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

categorySchema.set("toObject", { virtuals: true });

categorySchema.set("toJSON", { virtuals: true });

module.exports = Category;

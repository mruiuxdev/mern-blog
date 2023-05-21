const mongoose = require("mongoose");

const emailMessagingSchema = new mongoose.Schema(
	{
		fromEmail: {
			type: String,
			require: true,
		},
		toEmail: {
			type: String,
			require: true,
		},
		message: {
			type: String,
			require: true,
		},
		subject: {
			type: String,
			require: true,
		},
		sentBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		isFlagged: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const EmailMessaging = mongoose.model("EmailMessaging", emailMessagingSchema);

emailMessagingSchema.set("toObject", { virtuals: true });

emailMessagingSchema.set("toJSON", { virtuals: true });

module.exports = EmailMessaging;

const asyncHandler = require("express-async-handler");
const filterBadWords = require("bad-words");
const sendMail = require("../../config/sendGrid/sendGrid");
const validateMongoDBId = require("../../utils/validateMongoDBId");
const EmailMessaging = require("../../models/emailMessaging/EmailMessagingModel");
const User = require("../../models/user/UserModel");

const sendEmailMsg = asyncHandler(async (req, res, next) => {
	const { to, subject, message } = req.body;

	const { _id, email, isBlocked } = req.user;

	const filter = new filterBadWords();

	const isProfane = filter.isProfane(subject, message);

	validateMongoDBId(_id);

	if (isBlocked) {
		return res.json(
			"You is blocked before, Contact support blog@support.com to unblock your account"
		);
	}

	if (isProfane) {
		await User.findByIdAndUpdate(_id, { isBlocked: true }, { new: true });

		return res.json(
			"Sent email failed because it contains profane words and you have been blocked"
		);
	} else {
		try {
			await sendMail(email, to, subject, message);

			const emailMessage = await EmailMessaging.create({
				fromEmail: email,
				toEmail: to,
				subject,
				message,
			});

			res.json(emailMessage);
		} catch (err) {
			next(err);
		}
	}
});

module.exports = { sendEmailMsg };

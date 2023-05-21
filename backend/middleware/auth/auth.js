const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../../models/user/UserModel");

const auth = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];

			if (token) {
				const decoded = jwt.verify(token, process.env.JWT_SECRET);

				const user = await User.findById(decoded.id).select("-password");

				req.user = user;

				next();
			} else {
				throw new Error("There is no token attached to headers");
			}
		} catch (err) {
			throw new Error("Not authorized token expired, login again");
		}
	} else {
		throw new Error("Authorization header is missing");
	}
});

module.exports = auth;

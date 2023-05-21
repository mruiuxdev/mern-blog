const express = require("express");
const auth = require("../middleware/auth/auth");
const {
	sendEmailMsg,
} = require("../controllers/emailMessaging/EmailMessagingController");

const router = express.Router();

router.route("/send-email").post(auth, sendEmailMsg);

module.exports = router;

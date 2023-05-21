const mongoose = require("mongoose");

const validateMongoDBId = (id) => {
	const isValid = mongoose.Types.ObjectId.isValid(id);

	if (!isValid) throw new Error("Id is not found or valid");
};

module.exports = validateMongoDBId;

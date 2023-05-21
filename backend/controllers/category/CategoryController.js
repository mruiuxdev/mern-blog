const asyncHandler = require("express-async-handler");
const validateMongoDBId = require("../../utils/validateMongoDBId");
const Category = require("../../models/category/CategoryModel");

const createCategory = asyncHandler(async (req, res, next) => {
	const { _id } = req.user;

	const { title } = req.body;

	validateMongoDBId(_id);

	try {
		const category = await Category.create({
			title,
			user: _id,
		});

		res.json(category);
	} catch (err) {
		next(err);
	}
});

const categories = asyncHandler(async (req, res, next) => {
	try {
		const categories = await Category.find()
			.populate("user")
			.sort("-createdAt");
		res.json(categories);
	} catch (err) {
		next(err);
	}
});

const category = asyncHandler(async (req, res) => {
	const { categoryId } = req.params;

	validateMongoDBId(categoryId);

	try {
		const category = await Category.findById(categoryId);

		res.json(category);
	} catch (err) {
		next(err);
	}
});

const updateCategory = asyncHandler(async (req, res) => {
	const { categoryId } = req.params;

	const { title } = req.body;

	validateMongoDBId(categoryId);

	try {
		const category = await Category.findByIdAndUpdate(
			categoryId,
			{ title },
			{ new: true, runValidators: true }
		);

		res.json(category);
	} catch (err) {
		next(err);
	}
});

const deleteCategory = asyncHandler(async (req, res) => {
	const { categoryId } = req.params;

	validateMongoDBId(categoryId);

	try {
		await Category.findByIdAndDelete(categoryId);

		res.json("Category deleted");
	} catch (err) {
		next(err);
	}
});

module.exports = {
	createCategory,
	categories,
	category,
	updateCategory,
	deleteCategory,
};

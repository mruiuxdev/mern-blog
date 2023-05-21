const express = require("express");
const auth = require("../middleware/auth/auth");
const {
	createCategory,
	categories,
	category,
	updateCategory,
	deleteCategory,
} = require("../controllers/category/CategoryController");

const router = express.Router();

router.route("/category").post(auth, createCategory);
router.route("/categories").get(auth, categories);
router.route("/category/:categoryId").get(auth, category);
router.route("/category/:categoryId").put(auth, updateCategory);
router.route("/category/:categoryId").delete(auth, deleteCategory);

module.exports = router;

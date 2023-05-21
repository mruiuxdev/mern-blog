const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
	file.mimetype.startsWith("image")
		? cb(null, true)
		: cb({ message: "Unsupported file format" }, false);
};

const photoUploader = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
	limits: { fileSize: 1000000 },
});

const profilePhotoResize = async (req, res, next) => {
	if (!req.file) return next();

	req.file.filename = `user-${Date.now()}-${req.file.originalname.replace(
		/ /g,
		"-"
	)}`;

	const dirPath = path.join("public/images/profile/");

	if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

	await sharp(req.file.buffer)
		.resize({ width: 250, height: 250, fit: "cover" })
		.toFormat("jpeg", { mozjpeg: true })
		.jpeg({ quality: 90 })
		.toFile(path.join(`public/images/profile/${req.file.filename}`));

	next();
};

const postPhotoResize = async (req, res, next) => {
	if (!req.file) return next();

	req.file.filename = `user-${Date.now()}-${req.file.originalname.replace(
		/ /g,
		"-"
	)}`;

	const dirPath = path.join("public/images/posts/");

	if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

	await sharp(req.file.buffer)
		.resize({ width: 500, height: 500, fit: "cover" })
		.toFormat("jpeg", { mozjpeg: true })
		.jpeg({ quality: 90 })
		.toFile(path.join(`public/images/posts/${req.file.filename}`));

	next();
};

module.exports = { photoUploader, profilePhotoResize, postPhotoResize };

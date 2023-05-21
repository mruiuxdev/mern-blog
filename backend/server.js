const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db/db");
const { errorHandler, notFound } = require("./middleware/error/errorHandler");

const app = express();

env.config();

connectDB();

app
	.use(express.json())
	.use(bodyParser.urlencoded({ extended: true }))
	.use(cors())
	.use(process.env.API_URL, require("./routes/UsersRoutes"))
	.use(process.env.API_URL, require("./routes/PostsRoutes"))
	.use(process.env.API_URL, require("./routes/CommentsRoutes"))
	.use(process.env.API_URL, require("./routes/EmailMessagingRoutes"))
	.use(process.env.API_URL, require("./routes/CategoryRoutes"))
	.use(notFound)
	.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`The server backend run on port ${port}`));

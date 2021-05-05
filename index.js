require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const usersRouter = require("./routes/users-router");
const plantsRouter = require("./routes/plants-router");
const authRouter = require("./routes/auth-router");
// const remindersRouter = require("./routes/reminders-router");
const restrict = require("./middleware/restrict");

const server = express();

server.use(cors());
server.options('/user/:plant_id', cors());

server.use(express.json());

server.use(bodyParser.urlencoded({
	extended: true
}));

server.use(bodyParser.json());

server.use(helmet());
server.use(cookieParser());

server.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "https://water-my-plants-frontend-wilcoxva.vercel.app");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
	res.header("Access-Control-Allow-Credentials", true);
	next();
});

server.use("/", authRouter);
server.use("/", restrict(), usersRouter);
server.use("/user", restrict(), plantsRouter);
// server.use("/user/plant", restrict(), remindersRouter);

server.use((err, req, res, next) => {
	res.status(500).json({
		message: "Something went wrong",
	});
});

server.listen(process.env.PORT || 5000);

module.exports = server
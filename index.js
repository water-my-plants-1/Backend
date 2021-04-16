require("dotenv").config()
const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const usersRouter = require("./routes/users-router")
const plantsRouter = require("./routes/plants-router")
const authRouter = require("./routes/auth-router")
const remindersRouter = require("./routes/reminders-router")
const restrict = require("./middleware/restrict")

const server = express()
const port = 5000

server.use(cors())
server.use(helmet())
server.use(express.json())
server.use(cookieParser())

server.use("/", authRouter)
server.use("/", restrict(), usersRouter)
server.use("/user", restrict(), plantsRouter)
server.use("/user/plant", restrict(), remindersRouter)

server.use((err, req, res, next) => {
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(process.env.PORT || 5000)

module.exports = server
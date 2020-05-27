require("dotenv").config()
const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const usersRouter = require("./routes/users-router")
const plantsRouter = require("./routes/plants-router")
const authRouter = require("./routes/auth-router")
const restrict = require("./middleware/restrict")

const server = express()
const port = process.env.PORT || 5000

server.use(cors())
server.use(helmet())
server.use(express.json())
server.use(cookieParser())
server.use(session({
	name: "sess",
	resave: false,
	saveUninitialized: false,
	secret: "keep it secret, keep it safe",
}))

server.use("/", authRouter)
server.use("/", restrict(), usersRouter)
server.use("/user", restrict(), plantsRouter)

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})
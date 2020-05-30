require("dotenv").config()
const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const usersRouter = require("./routes/users-router")
const plantsRouter = require("./routes/plants-router")
const authRouter = require("./routes/auth-router")
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

server.use((err, req, res, next) => {
	res.status(500).json({
		message: "Something went wrong",
	})
})

if (!module.parent) {
	server.listen(port, () => {
	  console.log(`Server running at http://localhost:${port}`)
	})
  }

module.exports = server
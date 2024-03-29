const express = require("express")
const Users = require("../models/users-model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const router = express.Router()

router.post("/register", async (req, res, next) => {
	try {
		const { username, password, phoneNumber } = req.body
        const userUserName = await Users.findBy({ username }).first()
        const userPhoneNumber = await Users.findBy({ phoneNumber }).first()

		if (userUserName) {
			return res.status(409).json({
				message: "Username already exists!"
			});
        }

        if (userPhoneNumber) {
			return res.status(409).json({
				message: "Phone number already exists!"
			});
        }
        
        if ( username && password && phoneNumber ) {
            const newUser = await Users.add({ username, password, phoneNumber });
            return res.status(201).json(newUser)
        } else {
            return res.status(500).json({ message: "Missing username, password, or phone number" })
		}
		
	} catch(err) {
		next(err)
	}
})

router.post("/login", async (req, res, next) => {
	const authError = {
		message: "Invalid Credentials",
	}

	try {
		const user = await Users.findBy({ username: req.body.username }).first()
		if (!user) {
			return res.status(401).json(authError)
		}

		const passwordValid = await bcrypt.compare(req.body.password, user.password)
		if (!passwordValid) {
			return res.status(401).json(authError)
		}

		const tokenPayload = {
			userId: user.id,
			userRole: "normal",
		}

		const token = jwt.sign(tokenPayload, process.env.SECRET_KEY)

		res.cookie("token", token)
		res.json({
			message: `Welcome ${user.username}!`,
			token: token,
		})
	} catch(err) {
		next(err)
	}
})

module.exports = router
const express = require("express")
const Plants = require("../models/plants-model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const router = express.Router()

router.get("/plants", async (req, res, next) => {
	try {
		res.json(await Plants.find())
	} catch(err) {
		next(err)
	}
})

module.exports = router
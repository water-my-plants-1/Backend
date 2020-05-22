const express = require("express")
const Plants = require("../models/plants-model")
const restrict = require("../middleware/restrict")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const router = express.Router()

router.get("/", restrict(), async (req, res, next) => {
	try {
		res.json(await Plants.find())
	} catch(err) {
		next(err)
	}
})

router.

router.

module.exports = router
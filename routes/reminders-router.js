const express = require("express")
const Reminders = require("../models/reminders-model")

const router = express.Router()

router.get("/:reminder_id", async (req, res, next) => {
	try {
		const reminder = await Reminders.findById(req.params.reminder_id)
		return res.json(reminder)
	} catch (err) {
		next(err)
	}
})

router.post("/", async (req, res, next) => {
	try {
		const newReminder = { reminder_message: req.body.reminder_message, h2o_frequency: req.body.h2o_frequency, user_id: req.decodedToken.userId }
		const reminder = await Reminders.add(newReminder, req.decodedToken.userId)
		return res.status(201).json(reminder)
	} catch (err) {
		next(err)
	}
})
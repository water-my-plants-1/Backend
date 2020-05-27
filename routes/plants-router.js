const express = require("express")
const Plants = require("../models/plants-model")

const router = express.Router({ mergeParams: true })

router.get("/plants", async (req, res, next) => {
	try {
		const plants = await Plants.find(req.session.user.id)
		res.json(plants)
	} catch (err) {
		next(err)
	}
})

router.get("/:plant_id", async (req, res, next) => {
	try {
		const plant = await Plants.findById(req.params.plant_id)
		res.json(plant)
	} catch (err) {
		next(err)
	}
})

router.post("/", async (req, res, next) => {
	try {
		const newPlant = { nickname: req.body.nickname, species: req.body.species, h2oFrequency: req.body.h2oFrequency, image_url: req.body.image_url }
		const plant = await Plants.add(newPlant, req.session.user.id)
		res.status(201).json(plant)
	} catch (err) {
		next(err)
	}
})

router.put("/:plant_id", async (req, res, next) => {
	try {
		const plant = await Plants.update(req.body, req.params.plant_id)
		if (req.session.user.id === plant.user_id) {
			res.status(201).json(plant)
		} else {
			res.json({ message: "That's not your plant." })
		}

	} catch (err) {
		next(err)
	}
})

router.delete("/:plant_id", async (req, res, next) => {
	try {
		const plant = await Plants.findById(req.params.plant_id)
		if (req.session.user.id === plant.user_id) {
			await Plants.remove(req.params.plant_id)
			res.status(204).json({ message: `set has been deleted` })
		} else {
			res.status(400).json({ message: "Could not delete another user's plant." })
		}

	} catch (err) {
		next(err)
	}
})

module.exports = router
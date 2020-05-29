const express = require("express")
const Plants = require("../models/plants-model")

const router = express.Router({ mergeParams: true })

router.get("/plants", async (req, res, next) => {
	try {
		const plants = await Plants.find(req.decodedToken.userId)
		return res.json(plants)
	} catch (err) {
		next(err)
	}
})

router.get("/:plant_id", async (req, res, next) => {
	try {
		const plant = await Plants.findById(req.params.plant_id)
		return res.json(plant)
	} catch (err) {
		next(err)
	}
})

router.post("/", async (req, res, next) => {
	try {
		console.log(req.decodedToken.userId)
		const newPlant = { nickname: req.body.nickname, species: req.body.species, h2oFrequency: req.body.h2oFrequency, image_url: req.body.image_url, user_id: req.decodedToken.userId }
		const plant = await Plants.add(newPlant, req.decodedToken.userId)
		return res.status(201).json(plant)
	} catch (err) {
		next(err)
	}
})

router.put("/:plant_id", async (req, res, next) => {
	try {
		const x = await Plants.findBy({ nickname: req.body.nickname })
		if (x.length > 0) {
			 return res.json({ message: "Nickname already exists" })
		}
		const plant = await Plants.update(req.body, req.params.plant_id)
		if (req.decodedToken.userId === plant.user_id) {
			return res.status(201).json(plant)
		} else {
			return res.json({ message: "That's not your plant." })
		}

	} catch (err) {
		next(err)
	}
})

router.delete("/:plant_id", async (req, res, next) => {
	try {
		const plant = await Plants.findById(req.params.plant_id)
		if (req.decodedToken.userId === plant.user_id) {
			await Plants.remove(req.params.plant_id)
			return res.status(204).json({ message: `Plant has been deleted` })
		} else {
			return res.status(400).json({ message: "Could not delete another user's plant." })
		}

	} catch (err) {
		next(err)
	}
})

module.exports = router
const { request } = require("express")
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
		if (req.decodedToken.userId === plant.user_id) {
			return res.status(200).json(plant)
		} else {
			return res.json({ message: "That's not your plant." })
		}
	} catch (err) {
		next(err)
	}
})

router.post("/", async (req, res, next) => {
	try {
		const newPlant = { nickname: req.body.nickname, common_name: req.body.common_name, h2oFrequency: req.body.h2oFrequency, image_url: req.body.image_url, user_id: req.decodedToken.userId }
		const plant = await Plants.add(newPlant, req.decodedToken.userId)
		console.log("plant", plant)
		return res.status(201).json(plant)
	} catch (err) {
		next(err)
	}
})

router.put("/:plant_id", async (req, res, next) => {
	try {
		const nickname = await Plants.findBy({ nickname: req.body.nickname })
		if (nickname.length > 0) {
			 return res.json({ message: "Nickname already exists" })
		}
		const plant = await Plants.update(req.body, req.params.plant_id)
		console.log("plant", plant)
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
const express = require("express")
const Plants = require("../models/plants-model")

const router = express.Router({ mergeParams: true })

router.get("/user/plants", async (req, res, next) => {
	try {
	  const plants = await Plants.find(req.session.user.id)
	  res.json(plants)
	} catch (err) {
	  next(err)
	}
  })
  
  router.get("/user/:plant_id", async (req, res, next) => {
	try {
	  const plant = await Plants.findById(req.params.plant_id)
	  res.json(plant)
	} catch (err) {
	  next(err)
	}
  })
  
  router.post("/", async (req, res, next) => {
	try {
	  const newSet = { reps: parseInt(req.body.reps), weight: parseInt(req.body.weight) }
	  const set = await setsModel.add(newSet, req.params.id)
	  res.status(201).json(set)
	} catch (err) {
	  next(err)
	}
  })
  
  router.put("/:set_id", async (req, res, next) => {
	try {
	  const set = await setsModel.update(req.body, req.params.set_id)
	  res.status(201).json(set)
	} catch (err) {
	  next(err)
	}
  })
  
  router.delete("/:set_id", async (req, res, next) => {
	try {
	  const set = await setsModel.findById(req.params.set_id, req.params.id)
	  await setsModel.remove(req.params.set_id)
	  res.status(204).json({ message: `set has been deleted` })
	} catch (err) {
	  next(err)
	}
  })

module.exports = router
const express = require("express")
const usersModel = require("../models/users-model")
const bcrypt = require("bcryptjs")

const router = express.Router()

router.get("/users", async (req, res, next) => {
  try {
    const users = await usersModel.find(req.user)
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get("/user", async (req, res, next) => {
  try {
    const user = await usersModel.findById(req.session.user.id)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put("/user", async (req, res, next) => {
  try {
    const pass = await bcrypt.hash(req.body.password, 12)
    const user = await usersModel.update({username: req.body.username, phoneNumber: req.body.phoneNumber, password: pass }, req.session.user.id)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.delete("/user", async (req, res, next) => {
  try {
    const user = await usersModel.remove(req.session.user.id)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

module.exports = router
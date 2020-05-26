const bcrypt = require("bcryptjs")
const db = require("../data/config")

const add = async (plant, user_id) => {
	plant = { ...plant, user_id}
	const pgReturn = process.env.NODE_ENV === "production" ? "id" : null
	const [id] = await db("plants").insert(plant, pgReturn)
	return findById(id)
  }

function find(id) {
	return db("plants").where("user_id", id)
}

function findBy(filter) {
	return db("plants")
		.select("id", "nickname")
		.where(filter)
}

function findById(id) {
	return db("plants")
		.where({ id })
		.first()
}

module.exports = {
	add,
	find,
	findBy,
	findById,
}
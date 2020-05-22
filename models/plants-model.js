const bcrypt = require("bcryptjs")
const db = require("../database/config")

async function add(plant) {
	// hash the password with a time complexity of 14
	plant.password = await bcrypt.hash(plant.password, 14)

	const [id] = await db("plants").insert(plant)
	return findById(id)
}

function find() {
	return db("plants").select("id", "nickname")
}

function findBy(filter) {
	return db("plants")
		.select("id", "nickname")
		.where(filter)
}

function findById(id) {
	return db("plants")
		.select("id", "nickname")
		.where({ id })
		.first()
}

module.exports = {
	add,
	find,
	findBy,
	findById,
}
const bcrypt = require("bcryptjs")
const db = require("../data/config")

async function add(plant) {
	plant.password = await bcrypt.hash(plant.password, 14)

	const [id] = await db("plants").insert(plant)
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
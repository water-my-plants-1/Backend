const bcrypt = require("bcryptjs")
const db = require("../data/config")

const add = async ({ username, password, phoneNumber }) => {
	password = await bcrypt.hash(password, 12)
	const [id] = await db("users").insert({ username, password, phoneNumber }, process.env.NODE_ENV === "production"? "id": null)
	return findById(id)
  }

function find() {
	return db("users").select("id", "username")
}

function findBy(filter) {
	return db("users")
		.select("id", "username", "password")
		.where(filter)
}

async function findById(id) {
	const user = await db("users")
		.where({ id })
		.first("username", "password", "phoneNumber")

	return { ...user }
}

const update = async (user, id) => {
	await db("users")
		.where({ id })
		.update(user)
	return findBy({ id })
}

const remove = async (id) => {
	await db("users")
		.where({ id })
		.del(id);
	return findBy({ id })
}

module.exports = {
	add,
	find,
	findBy,
	findById,
	update,
	remove
}
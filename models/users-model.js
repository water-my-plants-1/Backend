const bcrypt = require("bcryptjs")
const db = require("../data/config")

async function add(user) {
	// hash the password with a time complexity of 14
	user.password = await bcrypt.hash(user.password, 14)

	const [id] = await db("users").insert(user)
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
	return findBy({id})
  }

function remove(id) {
	return db("users")
		.where({ id })
		.del();
}

module.exports = {
	add,
	find,
	findBy,
	findById,
	update,
	remove
}
const db = require("../data/config")

function find() {
	return db("reminders").select("id")
}

module.exports = {
	find,
}
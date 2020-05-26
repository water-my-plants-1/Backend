const knex = require("knex")
const knexfile = require("../knexfile")

// const dbenv = process.env.DB_ENV || "development";
const dbenv = process.env.DEVELOPMENT || "production";
console.log(dbenv)


module.exports = knex(knexfile[dbenv])
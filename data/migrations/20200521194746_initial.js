exports.up = async function(knex) {
	await knex.schema.createTable("users", (table) => {
		table.increments()
		table.text("username").notNull().unique()
        table.text("password").notNull()
    })
    
    await knex.schema.createTable("plants", (table) => {
		table.increments()
		table.text("nickname").notNull().unique()
        table.text("species").notNull()
        table.integer("h2oFrequency").notNull()
        table.specificType("plantImage", "image")
    })
}

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("plants")
    await knex.schema.dropTableIfExists("users")
}

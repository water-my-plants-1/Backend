exports.up = async function (knex) {
    await knex.schema.createTable("users", (table) => {
        table.increments()
        table.text("username").notNull().unique()
        table.text("password").notNull()
        table.text("phoneNumber").notNull().unique()
    })

    await knex.schema.createTable("plants", (table) => {
        table.increments()
        table.text("nickname").notNull().unique()
        table.text("species").notNull()
        table.integer("h2oFrequency").notNull()
        table.string("image_url")
        table
            .integer("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
    })
}

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("plants")
    await knex.schema.dropTableIfExists("users")
}

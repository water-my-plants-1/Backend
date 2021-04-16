exports.up = async function (knex) {
    await knex.schema.createTable("users", (table) => {
        table.increments()
        table.text("username").notNull().unique()
        table.text("password").notNull()
        table.text("phoneNumber").notNull().unique()
    })

    await knex.schema.createTable("plants", (table) => {
        table.increments()
        table.text("nickname").notNull()
        table.text("common_name").notNull()
        table.string("h2oFrequency").notNull()
        table.string("image_url")
        table
            .integer("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
    })

    // await knex.schema.createTable("reminders", (table) => {
    //     table.increments()
    //     table.text("reminder_message").notNull()
    //     table
    //         .string("h2o_frequency")
    //         .notNullable()
    //         .references("h2oFrequency")
    //         .inTable("plants")
    //         .onDelete("CASCADE")
    //         .onUpdate("CASCADE")
    //     table
    //         .integer("user_id")
    //         .notNullable()
    //         .references("id")
    //         .inTable("users")
    //         .onDelete("CASCADE")
    //         .onUpdate("CASCADE")
    // })
}

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("plants")
    await knex.schema.dropTableIfExists("users")
}

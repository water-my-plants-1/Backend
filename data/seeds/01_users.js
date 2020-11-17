const bcrypt = require("bcryptjs")
const hash = async (password) => await bcrypt.hash(password, 12)

exports.seed = async function (knex) {
    await knex("users").insert([
        { id: 1, username: "username1", password: `${await hash('password')}`, phoneNumber: "1111111111" },
        { id: 2, username: "username2", password: `${await hash('password')}`, phoneNumber: "2222222222" },
        { id: 3, username: "username3", password: `${await hash('password')}`, phoneNumber: "3333333333" },
    ])
};

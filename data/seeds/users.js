exports.seed = async function(knex) {
  await knex("users").truncate()

  await knex("users").insert([
    { id: 1, username: "i_love_plants", password: "1234" },
    { id: 2, username: "plant_girl", password: "1234" },
    { id: 3, username: "daisy", password: "1234" },
    { id: 4, username: "cactus_killer", password: "1234" },
  ])
};  

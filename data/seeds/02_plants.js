exports.seed = async function(knex) {

  await knex("plants").insert([
  { id: 1, nickname: "baby", species: "lily", h2oFrequency: "4", user_id: 4 },
    { id: 2, nickname: "sunshine", species: "daffodil", h2oFrequency: "3", user_id: 1 },
    { id: 3, nickname: "duck", species: "daisy", h2oFrequency: "7", user_id: 4 },
    { id: 4, nickname: "hombre", species: "cactus", h2oFrequency: "1", user_id: 2 },
  ])
};  

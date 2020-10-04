exports.seed = async function(knex) {

  await knex("plants").insert([
  { id: 1, nickname: "baby", species: "lily", h2oFrequency: "4" },
    { id: 2, nickname: "sunshine", species: "daffodil", h2oFrequency: "3" },
    { id: 3, nickname: "duck", species: "daisy", h2oFrequency: "7" },
    { id: 4, nickname: "hombre", species: "cactus", h2oFrequency: "1" },
  ])
};  

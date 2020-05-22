exports.seed = async function(knex) {
  await knex("plants").truncate()

  await knex("plants").insert([
    { id: 1, nickname: "baby", species: "lily", h20Frequency: "4" },
    { id: 2, nickname: "sunshine", species: "daffodil", h20Frequency: "3" },
    { id: 3, nickname: "duck", species: "daisy", h20Frequency: "7" },
    { id: 4, nickname: "hombre", species: "cactus", h20Frequency: "1" },
  ])
};  

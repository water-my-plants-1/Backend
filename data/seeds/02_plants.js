exports.seed = async function(knex) {

  await knex("plants").insert([
    { id: 1, nickname: "baby", common_name: "Lily", h2oFrequency: "4", user_id: 1 },
    { id: 2, nickname: "sunshine", common_name: "Daffodil", h2oFrequency: "3", user_id: 1 },
    { id: 3, nickname: "duck", common_name: "Daisy", h2oFrequency: "7", user_id: 1 },
    { id: 4, nickname: "hombre", common_name: "Cactus", h2oFrequency: "1", user_id: 2 },
    { id: 5, nickname: "baby", common_name: "Hibiscus", h2oFrequency: "4", user_id: 2 },
    { id: 6, nickname: "sunshine", common_name: "Orchid", h2oFrequency: "3", user_id: 2 },
    { id: 7, nickname: "duck", common_name: "Fern", h2oFrequency: "7", user_id: 3 },
    { id: 8, nickname: "hombre", common_name: "Basil", h2oFrequency: "1", user_id: 3 },
    { id: 8, nickname: "hombre", common_name: "Tomato", h2oFrequency: "1", user_id: 3 },
  ])
};  

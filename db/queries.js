const pool = require("./pool");

async function getAllTypes() {
  const result = await pool.query("SELECT type FROM types");
  return result.rows;
}

async function createNewType(newType) {
  await pool.query("INSERT INTO types (type) VALUES ($1);", [newType]);
}

async function getTypePokemons(type) {
  const result = await pool.query(
    "SELECT pokemon FROM pokemons JOIN types ON pokemons.typeid = types.id WHERE types.type = ($1)",
    [type]
  );
  return result.rows;
}

async function getAllTrainers() {
  const result = await pool.query("SELECT trainer FROM trainers");
  return result.rows;
}

async function createNewTrainer(newTrainer) {
  await pool.query("INSERT INTO trainers (trainer) VALUES ($1);", [newTrainer]);
}

module.exports = {
  getAllTypes,
  createNewType,
  getTypePokemons,
  getAllTrainers,
  createNewTrainer,
};

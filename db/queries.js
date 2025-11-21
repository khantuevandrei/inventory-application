const pool = require("./pool");

async function getAllTypes() {
  const result = await pool.query("SELECT type FROM types");
  return result.rows;
}

async function createNewType(newType) {
  await pool.query("INSERT INTO types (type) VALUES ($1);", [newType]);
}

async function getAllPokemon() {
  const result = await pool.query("SELECT * FROM pokemons");
  return result.rows;
}

async function getTypePokemons(type) {
  const result = await pool.query(
    "SELECT pokemon FROM pokemons JOIN types ON pokemons.typeid = types.id WHERE types.type = ($1)",
    [type]
  );
  return result.rows;
}

async function getAllTrainers() {
  const result = await pool.query("SELECT * FROM trainers");
  return result.rows;
}

async function createNewTrainer(newTrainer) {
  await pool.query("INSERT INTO trainers (trainer) VALUES ($1);", [newTrainer]);
}

async function getTrainerPokemon(trainer) {
  const result = await pool.query(
    "SELECT pokemon FROM pokemons JOIN trainer_pokemon ON pokemons.id = trainer_pokemon.pokemonid JOIN trainers ON trainers.id = trainer_pokemon.trainerid WHERE trainers.trainer = ($1);",
    [trainer]
  );
  return result.rows;
}

async function addPokemonToTrainer(trainer, pokemon) {
  await pool.query(
    `INSERT INTO trainer_pokemon (trainerid, pokemonid)
     SELECT trainers.id, pokemons.id
     FROM trainers
     INNER JOIN pokemons ON pokemons.pokemon = $2
     WHERE trainers.trainer = $1`,
    [trainer, pokemon]
  );
}

async function createPokemon(type, pokemon) {
  await pool.query(
    `INSERT INTO pokemons (pokemon, typeid)
    VALUES ($2, (SELECT id FROM types WHERE type = $1))
    `,
    [type, pokemon]
  );
}

async function deletePokemon(id) {
  await pool.query("DELETE FROM pokemons WHERE id = $1", [id]);
}

async function deleteTrainer(id) {
  await pool.query("DELETE FROM trainers WHERE id = $1", [id]);
}

async function deleteTrainerPokemon(trainer, pokemon) {
  await pool.query(
    `DELETE FROM trainer_pokemon
    WHERE trainerid=(SELECT id FROM trainers WHERE trainer=$1)
    AND pokemonid=(SELECT id FROM pokemons WHERE pokemon=$2)`,
    [trainer, pokemon]
  );
}

async function deleteType(type) {
  await pool.query("DELETE FROM types WHERE type = $1", [type]);
}

async function renameType(type, newType) {
  await pool.query("UPDATE types SET type=$2 WHERE type = $1", [type, newType]);
}

async function renameTrainer(trainer, newTrainer) {
  await pool.query("UPDATE trainers SET trainer=$2 WHERE trainer= $1", [
    trainer,
    newTrainer,
  ]);
}

async function renamePokemon(pokemon, newPokemon) {
  await pool.query("UPDATE pokemons SET pokemon=$2 WHERE pokemon= $1", [
    pokemon,
    newPokemon,
  ]);
}

module.exports = {
  getAllTypes,
  createNewType,
  getAllPokemon,
  getTypePokemons,
  getAllTrainers,
  createNewTrainer,
  getTrainerPokemon,
  addPokemonToTrainer,
  createPokemon,
  deletePokemon,
  deleteTrainer,
  deleteTrainerPokemon,
  deleteType,
  renameType,
  renameTrainer,
  renamePokemon,
};

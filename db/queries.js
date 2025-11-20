const pool = require("./pool");

async function getAllTypes() {
  const result = await pool.query("SELECT * FROM types");
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

module.exports = {
  getAllTypes,
  createNewType,
  getTypePokemons,
};

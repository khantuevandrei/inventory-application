const pool = require("./pool");

async function getAllTypes() {
  const result = await pool.query("SELECT * FROM types");
  return result.rows;
}

async function createNewType(newType) {
  await pool.query("INSERT INTO types (type) VALUES ($1);", [newType]);
}

module.exports = {
  getAllTypes,
  createNewType,
};

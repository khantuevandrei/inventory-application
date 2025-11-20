const pool = require("./pool");

async function getAllTypes() {
  const result = await pool.query("SELECT * FROM types");
  return result.rows;
}

module.exports = {
  getAllTypes,
};

const db = require("../db/queries");

async function typesListGet(req, res) {
  const types = await db.getAllTypes();

  res.render("index", {
    title: "Pokemons",
    types: types,
  });
}

module.exports = {
  typesListGet,
};

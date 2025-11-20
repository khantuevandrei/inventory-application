const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

async function indexGet(req, res) {
  const types = await db.getAllTypes();
  const trainers = await db.getAllTrainers();

  res.render("index", {
    title: "Home page",
    trainers: trainers,
    types: types,
  });
}

async function allPokemonGet(req, res) {
  const pokemons = await db.getAllPokemon();

  res.render("all", {
    title: "All pokemon",
    pokemons: pokemons,
  });
}

async function createPokemonGet(req, res) {
  const types = await db.getAllTypes();

  res.render("create-pokemon", {
    title: "Create pokemon",
    types,
  });
}

async function createPokemonPost(req, res) {
  const { type, pokemon } = req.body;

  try {
    await db.createPokemon(type, pokemon);
    res.redirect("/all");
  } catch (err) {
    if (err.code === "23505") {
      const types = await db.getAllTypes();
      return res.status(400).render("create-pokemon", {
        title: "Create pokemon",
        types,
        errors: [{ msg: `Pokemon "${pokemon}" already exists.` }],
      });
    }
  }
}

module.exports = {
  indexGet,
  allPokemonGet,
  createPokemonGet,
  createPokemonPost,
};

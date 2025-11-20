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

async function allGet(req, res) {
  const pokemons = await db.getAllPokemon();

  res.render("all", {
    title: "All pokemon",
    pokemons: pokemons,
  });
}

module.exports = {
  indexGet,
  allGet,
};

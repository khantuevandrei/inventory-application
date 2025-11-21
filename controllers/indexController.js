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

  res.render("pokemon", {
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

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validatePokemon = [
  body("pokemon")
    .trim()
    .isAlpha()
    .withMessage(`Pokemon name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Pokemon name ${lengthErr}`),
];

const createPokemonPost = [
  validatePokemon,
  async (req, res) => {
    const { type, pokemon } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const types = await db.getAllTypes();
      return res.status(400).render("create-pokemon", {
        title: "Create pokemon",
        types,
        errors: errors.array(),
      });
    }

    try {
      await db.createPokemon(type, pokemon);
      return res.redirect("/all");
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
  },
];

async function pokemonDelete(req, res) {
  const id = req.params.id;
  await db.deletePokemon(id);
  res.redirect("/pokemon");
}

async function renamePokemonGet(req, res) {
  const { pokemon } = req.params;

  res.render("rename-pokemon", {
    title: `Rename ${pokemon}`,
    pokemon,
  });
}

async function renamePokemonPost(req, res) {
  const { pokemon } = req.params;
  const { newPokemon } = req.body;
  await db.renamePokemon(pokemon, newPokemon);

  res.redirect("/pokemon");
}

module.exports = {
  indexGet,
  allPokemonGet,
  createPokemonGet,
  createPokemonPost,
  pokemonDelete,
  renamePokemonGet,
  renamePokemonPost,
};

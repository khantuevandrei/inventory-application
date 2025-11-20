const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

async function typesListGet(req, res) {
  const types = await db.getAllTypes();

  res.render("types", {
    title: "Pokemon types",
    types: types,
  });
}

function createTypeGet(req, res) {
  res.render("create-type", {
    title: "Create type",
  });
}

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateType = [
  body("newType")
    .trim()
    .isAlpha()
    .withMessage(`Type ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Type ${lengthErr}`),
];

createTypePost = [
  validateType,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("create-type", {
        title: "Create type",
        errors: errors.array(),
      });
    }

    const { newType } = matchedData(req);
    await db.createNewType(newType);
    res.redirect("/types");
  },
];

async function typeListGet(req, res) {
  const { type } = req.params;

  const pokemons = await db.getTypePokemons(type);

  res.render("pokemon", {
    title: `${type} type pokemon`,
    type,
    pokemons,
  });
}

async function createTypePokemonGet(req, res) {
  const { type } = req.params;

  res.render("create-type-pokemon", {
    title: `Create ${type} type pokemon`,
    type,
  });
}

const validatePokemon = [
  body("pokemon")
    .trim()
    .isAlpha()
    .withMessage(`Pokemon name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Pokemon name ${lengthErr}`),
];

const createTypePokemonPost = [
  validatePokemon,
  async (req, res) => {
    const errors = validationResult(req);
    const { type } = req.params;
    const { pokemon } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).render("create-type-pokemon", {
        title: `Create ${type} type pokemon`,
        type,
        errors: errors.array(),
      });
    }

    try {
      await db.createPokemon(type, pokemon);
      res.redirect(`/types/${type}`);
    } catch (err) {
      if (err.code === "23505") {
        return res.status(400).render("create-type-pokemon", {
          title: `Create ${type} type pokemon`,
          type,
          errors: [{ msg: `Pokemon "${pokemon}" already exists.` }],
        });
      }
    }
  },
];

module.exports = {
  typesListGet,
  createTypeGet,
  createTypePost,
  typeListGet,
  createTypePokemonGet,
  createTypePokemonPost,
};

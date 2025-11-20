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
  res.render("create", {
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
      return res.status(400).render("createtype", {
        title: "Create type",
        errors: errors.array(),
      });
    }

    const { newType } = matchedData(req);
    await db.createNewType(newType);
    res.redirect("/");
  },
];

async function typeListGet(req, res) {
  const { type } = req.params;

  const pokemons = await db.getTypePokemons(type);

  res.render("pokemons", {
    title: `${type} type pokemons`,
    type,
    pokemons,
  });
}

module.exports = {
  typesListGet,
  createTypeGet,
  createTypePost,
  typeListGet,
};

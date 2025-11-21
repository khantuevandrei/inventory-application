const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

async function trainersListGet(req, res) {
  const trainers = await db.getAllTrainers();

  res.render("trainers", {
    title: "Trainers",
    trainers: trainers,
  });
}

function createTrainerGet(req, res) {
  res.render("create-trainer", {
    title: "Create trainer",
  });
}

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateTrainer = [
  body("newTrainer")
    .trim()
    .isAlpha()
    .withMessage(`Name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Name ${lengthErr}`),
];

createTrainerPost = [
  validateTrainer,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("create-trainer", {
        title: "Create trainer",
        errors: errors.array(),
      });
    }

    const { newTrainer } = matchedData(req);
    await db.createNewTrainer(newTrainer);
    res.redirect("/trainers");
  },
];

async function trainerPokemonListGet(req, res) {
  const { trainer } = req.params;

  const trainerPokemon = await db.getTrainerPokemon(trainer);

  res.render("trainer", {
    title: `${trainer}'s pokemon`,
    trainer,
    trainerPokemon,
  });
}

async function trainerPokemonAddGet(req, res) {
  const { trainer } = req.params;

  const pokemonList = await db.getAllPokemon();

  res.render("add-pokemon", {
    title: "Add pokemon:",
    trainer,
    pokemonList,
  });
}

async function trainerPokemonAddPost(req, res) {
  const { trainer } = req.params;
  const { pokemon } = req.body;

  try {
    await db.addPokemonToTrainer(trainer, pokemon);
    res.redirect(`/trainers/${trainer}`);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).render("add-pokemon", {
        title: `Add pokemon:`,
        trainer,
        pokemonList: await db.getAllPokemon(),
        errors: [{ msg: `${trainer} already has a ${pokemon}.` }],
      });
    }
  }
}

async function trainerDelete(req, res) {
  const id = req.params.id;
  await db.deleteTrainer(id);
  res.redirect("/trainers");
}

module.exports = {
  trainersListGet,
  createTrainerGet,
  createTrainerPost,
  trainerPokemonListGet,
  trainerPokemonAddGet,
  trainerPokemonAddPost,
  trainerDelete,
};

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

module.exports = {
  trainersListGet,
  createTrainerGet,
  createTrainerPost,
};

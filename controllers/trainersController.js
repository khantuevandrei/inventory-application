const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

async function trainersListGet(req, res) {
  const trainers = await db.getAllTrainers();

  res.render("trainers", {
    title: "Trainers",
    trainers: trainers,
  });
}

module.exports = {
  trainersListGet,
};

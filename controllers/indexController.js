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

module.exports = {
  indexGet,
};

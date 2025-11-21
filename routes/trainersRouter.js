const { Router } = require("express");
const trainersController = require("../controllers/trainersController");

const trainersRouter = Router();

trainersRouter.get("/", trainersController.trainersListGet);
trainersRouter.get("/create", trainersController.createTrainerGet);
trainersRouter.post("/create", trainersController.createTrainerPost);
trainersRouter.get("/:trainer", trainersController.trainerPokemonListGet);
trainersRouter.get("/:trainer/add", trainersController.trainerPokemonAddGet);
trainersRouter.post("/:trainer/add", trainersController.trainerPokemonAddPost);
trainersRouter.delete("/:id", trainersController.trainerDelete);

module.exports = trainersRouter;

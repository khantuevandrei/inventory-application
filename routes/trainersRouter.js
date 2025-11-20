const { Router } = require("express");
const trainersController = require("../controllers/trainersController");

const trainersRouter = Router();

trainersRouter.get("/", trainersController.trainersListGet);

module.exports = trainersRouter;

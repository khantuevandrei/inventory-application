const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", indexController.indexGet);
indexRouter.get("/all", indexController.allPokemonGet);
indexRouter.get("/all/create", indexController.createPokemonGet);
indexRouter.post("/all/create", indexController.createPokemonPost);

module.exports = indexRouter;

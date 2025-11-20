const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", indexController.indexGet);
indexRouter.get("/pokemon", indexController.allPokemonGet);
indexRouter.get("/pokemon/create", indexController.createPokemonGet);
indexRouter.post("/pokemon/create", indexController.createPokemonPost);

module.exports = indexRouter;

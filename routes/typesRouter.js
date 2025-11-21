const { Router } = require("express");
const typesController = require("../controllers/typesController");

const typeRouter = Router();

typeRouter.get("/", typesController.typesListGet);
typeRouter.get("/create", typesController.createTypeGet);
typeRouter.post("/create", typesController.createTypePost);
typeRouter.get("/:type", typesController.typeListGet);
typeRouter.get("/:type/create", typesController.createTypePokemonGet);
typeRouter.post("/:type/create", typesController.createTypePokemonPost);
typeRouter.delete("/:type/", typesController.typeDelete);
typeRouter.get("/:type/rename", typesController.renameTypeGet);
typeRouter.post("/:type/rename", typesController.renameTypePost);

module.exports = typeRouter;

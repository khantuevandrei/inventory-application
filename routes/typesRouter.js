const { Router } = require("express");
const typesController = require("../controllers/typesController");

const typeRouter = Router();

typeRouter.get("/", typesController.typesListGet);
typeRouter.get("/create", typesController.createTypeGet);
typeRouter.post("/create", typesController.createTypePost);

module.exports = typeRouter;

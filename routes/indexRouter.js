const { Router } = require("express");
const inventoryController = require("../controllers/inventoryController");

const indexRouter = Router();

indexRouter.get("/", inventoryController.typesListGet);
indexRouter.get("/createtype", inventoryController.createTypeGet);
indexRouter.post("/createtype", inventoryController.createTypePost);

module.exports = indexRouter;

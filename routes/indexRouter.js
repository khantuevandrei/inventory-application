const { Router } = require("express");
const inventoryController = require("../controllers/inventoryController");

const indexRouter = Router();

indexRouter.get("/", inventoryController.typesListGet);

module.exports = indexRouter;

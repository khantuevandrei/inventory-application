const { Router } = require("express");
const typesController = require("../controllers/typesController");

const indexRouter = Router();

indexRouter.get("/", typesController.typesListGet);

module.exports = indexRouter;

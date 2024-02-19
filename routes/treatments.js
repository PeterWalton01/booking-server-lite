const express = require("express");
const treatmentsRouter = express.Router();

/*
 * routes associate with treatments
 */

const { getAllTreatments } = require("../controller/treatmentController");

const { checkAuthenticated } = require("./auth");

treatmentsRouter.get("/", checkAuthenticated, (req, res) => {
  getAllTreatments(req, res);
});

module.exports = { treatmentsRouter };

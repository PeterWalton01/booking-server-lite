const express = require("express");
const physiosRouter = express.Router();

/*
 * routes associate with physios
 */

const { getAllPhysios } = require("../controller/physioController");

const { checkAuthenticated } = require("./auth");

physiosRouter.get("/", checkAuthenticated, (req, res) => {
  getAllPhysios(req, res);
});

module.exports = { physiosRouter };

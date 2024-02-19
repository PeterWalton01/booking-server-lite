const express = require("express");
const adminRouter = express.Router();
const passport = require("passport");
const { googleResponse } = require("../utils/utils");

const { registerUser } = require("../controller/userController");

/*
 * routes associate with user registration
 * and logon/logoff. Additionally, two function
 * to check login status
 */

adminRouter.post("/register", (req, res) => {
  registerUser(req, res);
});

adminRouter.post("/login", checkNotAuthenticated, function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err); // deal with potential errors
      // code 500 generated
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      // return res.send({ status: false, message: "logon failed" });
      return res.status(291).send({ success: false, message: "Logon failed" });
    }
    // Establish session and send response
    req.login(user, (loginError) => {
      if (loginError) {
        res.status(200).send({ success: false, message: "Logon failed" });
        return next(loginError);
      }
      return res
        .status(200)
        .send({ success: true, message: "Logon successful" });
    });
  })(req, res, next);
});

adminRouter.delete("/logout", checkAuthenticated, (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    return res
      .status(200)
      .send({ success: true, message: "Logout successful" });
  });
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(291).send({ success: false, message: "Please login." });
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res
      .status(409)
      .send({ success: false, message: "Already logged in" });
  }
  next();
}

module.exports = { adminRouter, checkAuthenticated, checkNotAuthenticated };

const passport = require("passport");
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


router.post("/register", userController.register);
router.post("/login", userController.login);

//No nned to provide manual call back passprt will handle it all
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);


module.exports = router;

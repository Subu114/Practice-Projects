const express = require("express");
const router = express.Router();
const passport = require('passport')

//Route Controllers
const UserController = require("../controllers/userController")

//Getting all users
router.get("/", UserController.viewAll)

//For Sign Ups
router.post("/register", UserController.register)

//For Sign Ins
router.post("/login", UserController.logIn)

//Authentication using other means(signin/register)
router.post("/login/google", passport.authenticate("google", { scope: ["profile", "email"] }));

  
module.exports = router
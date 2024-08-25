const express = require("express");
const router = express.Router();
const passport = require("passport");

// Route Controllers
const UserController = require("../controllers/jobPostingController");

// Routes
router.get("/", passport.authenticate("jwt", { session: false }), UserController.view);
router.post("/create", passport.authenticate("jwt", { session: false }), UserController.create);
router.delete("/delete/:id", passport.authenticate("jwt", { session: false }), UserController.delete);

module.exports = router;

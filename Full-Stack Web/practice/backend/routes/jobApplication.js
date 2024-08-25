const express = require("express");
const router = express.Router();
const passport = require("passport");

// Route Controllers
const JobApplicationController = require("../controllers/jobApplicationController.js");

// Routes
router.get("/", passport.authenticate("jwt", { session: false }), JobApplicationController.view);
router.post("/create", passport.authenticate("jwt", { session: false }), JobApplicationController.create);
router.delete("/delete/:id", passport.authenticate("jwt", { session: false }), JobApplicationController.delete);

module.exports = router;

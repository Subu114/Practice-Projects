const express = require('express');
const router  = express.Router();
const passport = require("passport")
const personalPageController = require('../controllers/personalPageController')

router.get("/", passport.authenticate("jwt", {session : false}), async (req, res) => {
    res.send("You are accessing this text rigth now")
})

module.exports = router;
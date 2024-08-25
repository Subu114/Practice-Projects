const express = require('express');
const router = express.Router();
const passport = require("passport");


const suucessLogInURL = "http://localhost:3000/login/success"
const errorLogInURL = "http://localhost:3000/login/failure"

router.use("/users", require("../routes/userRoutes.js"));
router.use("/properties", require("../routes/propertyRoutes.js"));
router.use("/personalpage", require("../routes/personalPageRoute.js"));

router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureMessage: "Cannot login with Google, please trya gain after some time!",
      failureRedirect : errorLogInURL,
      successRedirect : suucessLogInURL
    }),
    (req, res) => {
      console.log("USER(inside req) : ", req.user)
      res.send("Thank You for Signing in 😇");
    }
  );

router.get("/", (req, res) => {
    return res.send("Hello There");
    res.json({message : "Hello There!!"})    

})



module.exports = router
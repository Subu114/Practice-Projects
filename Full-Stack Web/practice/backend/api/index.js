const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersRoute = require("../routes/user")
const jobPostingRoutes = require("../routes/jobPosting")
const jobApplicationRoutes = require("../routes/jobApplication")

const suucessLogInURL = "http://localhost:5173/login/success"
const errorLogInURL = "http://localhost:5173/login/failure"


router.use("/users", usersRoute)
router.use("/jobposts", jobPostingRoutes)
router.use("/jobapplications", jobApplicationRoutes)

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

module.exports = router;
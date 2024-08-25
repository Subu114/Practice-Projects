const passport = require("passport");
const passportjwt = require("passport-jwt");
const User = require("../models/user");

const ExtractJwt = passportjwt.ExtractJwt;
const StrategyJwt = passportjwt.Strategy;

//First Arg - Strategy
//Second Arg - call back  that tells hoe it uses the strategy
passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) => {
      //done is a callback fn
      return User.findOne({ where: { id: jwtPayload.id } })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

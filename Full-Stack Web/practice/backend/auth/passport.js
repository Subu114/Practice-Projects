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
    async (jwtPayload, done) => {
      //done is a callback fn
      // console.log("outside : ", jwtPayload)
      // const user = User.findOne({ where: { user_id: jwtPayload.user_id } })
      //   .catch((err) => {console.log("in2 : ", err.message)
      //     return done(err);
      //   });
      // if(user){
      //   console.log("lofas:", user)
      //   return done(null, user)
      // }
      try {
        const user = await User.findOne({ where: { user_id: jwtPayload.user_id } });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

module.exports = passport
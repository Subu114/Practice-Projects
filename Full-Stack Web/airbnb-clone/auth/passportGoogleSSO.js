const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy

const User = require("../models/user");

//redirect ur after sign in completion
const GOOGLE_CALLBACK_URL = "http://localhost:5000/api/v1/auth/google/callback"

passport.use(new GoogleStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_SECRET_ID,
    callbackURL : GOOGLE_CALLBACK_URL,
    passReqToCallback : true
}, async (req, accessToken, refreshToken, profile, cb) => {
    //accessToken - Given by the google after sign in (dies in couple time)
    //refreshToek - Never dies, this is used when accesstoken is not there
    //user profile
    //cb call back fn once everything is done
    const defaultUser = {
        name : `${profile.name.givenName} ${profile.name.familyName}`,
        email : profile.emails[0].value,
        photo : profile.photos[0].value,
        password : "",
        googleId : profile.id,
    };
    console.log("DEFAULT USER: ", defaultUser)
    try {
        const [user, created] = await User.findOrCreate({
            where: { email: defaultUser.email },
            defaults: defaultUser
        });

        console.log("USER: ", user);
        console.log("CREATED: ", created);

        if (user) return cb(null, user);
    } catch (err) {
        console.log("Error signing up using Google: ", err);
        return cb(err, null);
    }

}))

passport.serializeUser((user, cb) => {
    console.log("Serializing User ", user);
    cb(null, user)
})

passport.deserializeUser(async (id, cb) => {
    console.log(id)
    const user = await User.findOne({where : {id}}).catch((err) => {
        console.log("Error in deserializing ", err)
        cb(err, null);
    })
    
    console.log("Deserialized USer : ", user);
    if(user)
        cb(null, user);
})
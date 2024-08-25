const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const sequelize = require("./config/database");
const passport = require("passport");
const cookieSession = require("cookie-session");

require('dotenv').config();
require('./auth/passport.js')
require('./auth/passportGoogleSSO.js')




const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares used
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize())
app.use(passport.session())


//Routess
app.use("/api/v1", require("./api/index.js"));

//Testing connection of Databsse
sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected to server!!!");
  })
  .catch((err) => {
    console.log("Error in Connecting the database");
    console.log(err);
  });

sequelize
  .sync()
  .then(() => console.log("Database synced..."))
  .catch((err) => console.log("Error: " + err));


app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});

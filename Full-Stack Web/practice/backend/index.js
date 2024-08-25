const express = require('express');
const cors = require("cors")
const bodyParser = require("body-parser")
const session = require("express-session")
const passport = require("passport")
const sequelize = require("./config/database")



require('dotenv').config()
require('./auth/passport.js')
require('./auth/googleAuth.js')

const app = express();
const PORT = process.env.PORT || 5000;


//Middleware
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(cors())

app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));
app.use(passport.initialize())
app.use(passport.session())

//Routes
app.use("/api/v1", require("./api/index.js"))


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
  .sync({alter : false})
  .then(() => console.log("Database synced..."))
  .catch((err) => console.log("Error: " + err));



app.listen(PORT, () => {
    console.log("Backend Server hosted on port ", PORT);
})
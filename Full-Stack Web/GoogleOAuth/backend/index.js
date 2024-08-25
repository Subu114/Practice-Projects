const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

const oauthRoute = require("./routes/oAuth");
const requestRoute = require("./routes/request");

app.use(cors());
app.use("/oauth", oauthRoute);
app.use("/request", requestRoute);

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});

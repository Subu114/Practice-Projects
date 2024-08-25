
const express = require('express');

const app = express();
const PORT = 8000;

app.use(express.urlencoded({extended : false}))

require('./src/database/connection');
require("./src/bootstrap")();

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
})
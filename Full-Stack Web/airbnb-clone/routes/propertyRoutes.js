const express = require('express');
const router  = express.Router();
const propertyController = require("../controllers/propertyController")

router.post('/createproperty', propertyController.createProperty);
router.get('/getallproperties', propertyController.getAllProperties);

module.exports = router
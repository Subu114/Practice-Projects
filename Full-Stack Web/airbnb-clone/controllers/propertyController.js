const Property = require("../models/property");

exports.createProperty = async (req, res) => {
    try {
        console.log("Inn")
        const {title, description, price, location} = req.body;
        const property = await Property.create({title, description, price, location})
        res.status(200).json({messsage : "Property details added successfully!!", property})
        
    } catch (error) {
        res.status(500).json({message : "Server Error!", error });
    }
}

exports.getAllProperties = async (req, res) => {
    try {
        //const {userId} = req.body
     
        const properties = await Property.findAll()
        res.status(200).json(properties)
    } catch (error) {
        res.status(500).json({message : "Server Error!", error });
    }
}


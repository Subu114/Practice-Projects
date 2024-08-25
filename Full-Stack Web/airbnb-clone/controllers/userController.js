const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const existedUser = await User.findOne({where : {email}}).catch((err) => {
            console.log("Error in checking if user Existed!");
            return res.status(500).json({message : "Error in Registering User", err});
        })
        
        if(existedUser)
            return res.json({message : "User with email already exist!"});

        const hashedPassword = (await bcrypt.hash(password, 10)).toString();
        const user = User.create({name, email, password : hashedPassword})
        res.status(200).json({message : "User Registered Successfully!", User : user})

    } catch (error) {
        res.status(500).json({message : "Error in Registering User", error : error});
    }
}
exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}})
        
        if(!user){
            return res.status(404).json({message : "Email or Password Does Not match"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(404).json({message : "Email or Password Does Not match"})
        }

        const token = jwt.sign({id : user.id, email : user.email}, process.env.JWT_SECRET, {expiresIn : '1h'})
        res.status(200).json({message : "Log In Sucessfull!", token});

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


const User = require("../models/user");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const {Op} = require("sequelize")

exports.register = async (req, res) => {
    try {
        const { username, password, email, user_type } = req.body;

        if (!(username && password && email && user_type)) {
            return res.status(400).json({ message: "Please provide the correct and full details" });
        }

        // Check if the user already exists
        const existedUser = await User.findOne({ where: { email } });
        if (existedUser) {
            return res.status(409).json({ message: "User with this email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = await User.create({ username, password: hashedPassword, email, user_type });
        res.status(201).json({ message: "Successfully Registered User", user });
    } catch (err) {
        console.error("Error registering the user:", err);
        res.status(500).json({ message: "Error registering the user", error: err.message });
    }
};



exports.logIn = async (req, res) => {
    try{
        const {email, password} = req.body;
        
        if(!email || !password){
            return res.status(400).json({ message: "Please provide the correct and full Credentials" });
        }
            

        //Find the user in the db
        const user = await User.findOne({where: {email}})
        
        //if user not present 
        if(!user){
            return res.status(404).json({message : "Email or Password Does Not match"})
        }

        //Check if the password provided is correct
        const isMatch = await bcrypt.compare(password, user.password)

        //if not return res
        if(!isMatch){
            return res.status(404).json({message : "Email or Password Does Not match"})
        }

        //create a token and send in the response after sigining in
        const token = jwt.sign({user_id : user.user_id, email : user.email}, process.env.JWT_SECRET, {expiresIn : '1h'})
        res.status(200).json({message : "Log In Sucessfull!",userId : user.user_id, token, userType : user.user_type});

    } catch(err){
        console.log("Error in signing In : ", err)
        res.status(500).json({message : "Error Signing in the user", err})
    }
}
exports.viewAll = async (req, res) => {
    try {
        if(req.query.search) {
            const users = await User.findAll({
                where: {
                    username: {
                        [Op.like]: `%${req.query.search}%`
                    }
                },
                attributes: ["user_id", "username", "email", "user_type"]
            });
            return res.status(200).json(users);
        } else {
            const users = await User.findAll({
                attributes: ["user_id", "username", "email", "user_type"]
            });
            if(users.length > 0) {
                return res.status(200).json(users);
            } else {
                return res.status(404).json({ message: "No users found" });
            }
        }
    } catch (err) {
        console.error("Error in fetching users:", err);
        return res.status(500).json({ message: "Error fetching users", error: err.message });
    }
};
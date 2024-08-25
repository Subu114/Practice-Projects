module.exports = async (req, res, next) => {
    try {
        if(req.user)
            next();
        else{
            res.status(401).send("You Mus Log In First");
        }
    } catch (error) {
        
    }
}
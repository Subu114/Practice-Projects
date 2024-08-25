const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");

async function getUserData(token) {
    try {
        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
        const data = await response.json();
        console.log("User Data:", data);
    } catch (error) {
        console.log("Error:", error.message);
    }
}

router.get("/", async (req, res, next) => {
    try {
        console.log("START OF AUTH")
        const code = req.query.code;
        if(!code){{
            console.log(`Code is ${code}`);
            return res.status(500).json({error : "Error in Signing using Google! Please try again"})
        }}
        const redirectURL = 'http://localhost:8000/oauth';
        const oAuth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            redirectURL
        );
        
        const tokenResponse = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(tokenResponse.tokens);
        
        console.log("Token acquired");
        const user = oAuth2Client.credentials;
        console.log("USER CREDENTIAL:", user);
        // SAVE THE TOKEN TO COOKIE WHEREVER NEEDED
        await getUserData(user.access_token);
        console.log("END OF AUTH")
        return res.redirect(`http://localhost:5173/login/success?user=${encodeURIComponent(JSON.stringify({
            id: "SubodhIDDDD",
            name: "Name",
            email: "Email maji"
        }))}&access_token=${user.access_token}`);
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");

router.get("/", async (req, res, next) => {
    try {
        console.log("START OF REQUEST")
        res.header("Access-Control-Allow-Origin", "http://localhost:5173");
        res.header("Referrer-Policy", "no-referrer-when-downgrade");
        
        const redirectURL = 'http://localhost:8000/oauth';
        const oAuth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            redirectURL
        );
        
        const authorizedUrl = oAuth2Client.generateAuthUrl({
            access_type: "offline", // For production (stores the session locally)
            scope: ["https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/userinfo.email", // Add this scope
                "openid"],
                prompt: 'consent'
            });
            
        console.log("END OF REQUEST")
        res.json({ url: authorizedUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

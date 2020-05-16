const jwt = require('jsonwebtoken');

function verify_token(req,res,next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send("Access Denied!");
    try {
        const verified = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user = verified;
        console.log("Verified User");
        next();
    } catch(err) {
        res.status(400).send('Invalid Token');
    }
}

module.exports.verify_token = verify_token;
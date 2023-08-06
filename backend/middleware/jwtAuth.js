const JWT = require('jsonwebtoken')

//router level middleware function
exports.jwtAuth = (req,res,next) =>{s
// get cookie token(jwt token generated using json.sign()) form the request
const token = (req.cookies && req.cookies.token) || null;

//return response if there is no token(jwt token attached with cookies)

if(!token){
    return res.status(400).json({ success: false, message: "NOT authorized" });
}

//verify the token

try {
    const payload = JWT.verify(token,process.env.SECRET);
    req.user = {id:payload.id,email:payload.email}
    next()
} catch (error) {
    return res.status(400).json({ success: false, message: error.message });
}
next()
}

// module.exports = {jwtAuth};
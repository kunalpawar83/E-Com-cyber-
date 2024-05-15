const jwt = require('jsonwebtoken');
const key = "kunal_29/06/2003"



const jwtAuthMiddleware  = ( req,res,next)=>{
      // Check for token in headers, query parameters, or request body
      const token = req.headers.authorization || req.query.token || req.body.token;
    
      // Check if token exists
      if (!token) {
        return res.status(401).json({ error: 'Token is missing' });
      }
    
      // Verify token
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: 'Invalid token' });
        }
        // Token is valid, store decoded payload for further processing
        req.user = decoded;
        next(); // Proceed to next middleware or route handler
      });
    };
const generateToken = (userdata)=>{
            return jwt.sign(userdata,key);
};


module.exports = {jwtAuthMiddleware,generateToken};
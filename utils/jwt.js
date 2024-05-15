const jwt = require('jsonwebtoken');
const key = "kunal_29/06/2003"



const jwtAuthMiddleware  = ( req,res,next)=>{
    try{
        const authHeader = req.headers['authorization'];
            if (authHeader) {
                const token = authHeader.split(' ')[1]; // Assuming the token is sent as "Bearer <token>"
                jwt.verify(token, 'your_secret_key', (err, decoded) => {
                    if (err) {
                        return res.sendStatus(403); // Forbidden if token is invalid
                    }
            req.user = decoded; // Store the decoded token payload in req.user for future use
        next(); // Continue to the next middleware or route handler
    });
  } 
    }catch(err){
        console.log(err);
        res.status(400).json({
            status:"fail",
            error:"Invalid token"
        })
                   
    }
};


const generateToken = (userdata)=>{
            return jwt.sign(userdata,key);
};


module.exports = {jwtAuthMiddleware,generateToken};
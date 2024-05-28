const jwt = require('jsonwebtoken');
const key = "kunal_29/06/2003"
const catchAsync = require('./catchAsync.js');
const appError = require('./appError.js');



const jwtAuthMiddleware  = catchAsync(( req,res,next)=>{

        const token  =  req.headers.authorization.split(" ")[1] ;
        if(!token){
            return next(new appError('unauthorized',401));
        }
        const decoded = jwt.verify(token,key);
        req.user = decoded;
        next();
});


const generateToken = (userdata)=>{
            return jwt.sign(userdata,key);
};


module.exports = {jwtAuthMiddleware,generateToken};
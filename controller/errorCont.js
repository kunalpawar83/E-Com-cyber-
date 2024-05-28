const { error } = require("winston");

const senderrordev =(err,res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack
       })
};

const senderrorprod = (err,res)=>{
    if(err.isOperational){
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message
           })
    }else{
        console.error("---------------------------------",err)
        res.status(500).json({
            status:"error",
            message:"something went very wrong" 
        })
    }
}

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'development'){
        senderrordev(err,res);
    }else if(process.env.NODE_ENV === 'production'){
        senderrorprod(err,res);
    }
}
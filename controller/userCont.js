const { assertEnabled } = require('firebase-tools/lib/experiments.js');
const User =  require('../models/userModel.js');
const catchAsync = require('../utils/catchAsync.js');
const appError = require('../utils/appError.js');


//  get user data 
exports.getData  = catchAsync(async(req,res,next)=>{
        const userData  =   await User.findById(req.user.id);
        if(!userData){
            return next(new appError('User not found with that Id !',404))
        }
        res.status(200).json({
            status:"success",
            data:userData
        })
});



// user update
exports.updateUser  = catchAsync(async(req,res,next)=>{
        const userId  =  req.user.id;
        const userData  =  req.body;
        const response = await User.findByIdAndUpdate(userId,userData,{
            new:true,
            runValidators:true
          })
        if(!response){
           return next(new appError('User not found with that Id !',404))
        }
        res.status(200).json({
            status:"success",
            data:response
        })
});

// delete use  
exports.deleteUser  =  catchAsync(async(req,res,next)=>{
        const userId  = req.user.id;
        const response  = await User.findByIdAndDelete(userId);
        if(!response){
            return next(new appError('User not found with that Id !',404))
        }
        res.status(200).json({
            status:"success",
            data:response
        })
});




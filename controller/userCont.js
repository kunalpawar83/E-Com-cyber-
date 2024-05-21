const { assertEnabled } = require('firebase-tools/lib/experiments.js');
const User =  require('../models/userModel.js');



//  get user data 
exports.getData  = async(req,res)=>{
    try{
        const userData  =   await User.findById(req.user.id);
        if(!userData){
            return res.status(404).json({
                status:"fail",
                error:"User not found"
            })
           }
           res.status(200).json({
            status:"success",
            data:userData
        })

    }catch(err){
        console.log(err);
          res.status(500).json({
               error:'Internal server error'
          })
    }
}



// user update
exports.updateUser  = async(req,res)=>{
    try{
        const userId  =  req.user.id;
        const userData  =  req.body;
        const response = await User.findByIdAndUpdate(userId,userData,{
            new:true,
            runValidators:true
          })
          if(!response){
            return res.status(404).json({
                status:"fail",
                error:"User not found"
            })
           }
           res.status(200).json({
            status:"success",
            data:response
        })

    }catch(err){
        console.log(err);
          res.status(500).json({
               error:'Internal server error'
          })
    }
};

// delete use  
exports.deleteUser  =  async(req,res)=>{
    try{
        const userId  = req.user.id;
        const response  = await User.findByIdAndDelete(userId);
        if(!response){
            return res.status(404).json({
                status:"fail",
                error:"User not found"
            })
           }
           res.status(200).json({
            status:"success",
            data:response
        })
 
    }catch(err){
        console.log(err);
        res.status(500).json({
             error:'Internal server error'
        })
    }
};




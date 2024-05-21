const User = require('../models/userModel.js');
const {generateToken} = require('../utils/jwt.js');
const sendEmail = require('../utils/email.js');

exports.signup = async(req,res)=>{
    try{
    //const dataFile =  req.file.path;
     let data = req.body;
     //data.photo = dataFile;
     const newUser = new User(data);
     const response = await newUser.save();
      const payload = {
         id:response.id
      } 
      
      const token  = generateToken(payload);
      //sendEmail(response.email,'Welcome to our website', `Thank you for registering with us! and your token is here ${token}`);
      await sendEmail({
         email: response.email,
         subject: 'Welcome to our website',
         message: `Thank you for registering with us! and your token is here ${token}`
       });
   
       res.status(201).json({
       status:"success",
       token:token,
       response
       });

    }catch(err){
      console.log(err);
      res.status(500).json({
          error:"internal server Error"
       })
    }
}

exports.login = async(req,res)=>{
   try{
     const {email, password} = req.body;
     const user  = await User.findOne({email:email});

     // if email does not exist or pasword does not match , return error 
     if(!user || !(await user.comparePassword(password))){
       return res.status(400).json({
          status:"fail",
          error:"Invalid  email or password"
       })
     }
     
     const payload = {
       id:user.id
    } 
    
    const token  = generateToken(payload);
    await sendEmail({
      email: email,
      subject: 'Welcome to our website',
      message: `Thank you for registering with us! and your token is here ${token}`
    });
     res.status(201).json({
          status:"success",
          token:token
     })

   }catch(err){
       console.log(err);
      res.status(500).json({
       status:"fail",
       error:"Internal server error"
      })
   }
};




exports.getALlData = async(req,res)=>{
     try{
       const userData  = await User.find();

       req.status(200).json({
         userData
       })

     }catch(err){
      console.log(err);
      res.status(500).json({
       status:"fail",
       error:"Internal server error"
      })
     }
}
// forget passwordd  
exports.forgetPassword = async(req,res)=>{
      // 1) Get user based on POSTed email
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({
           errr:"user not whit that email address"
        })
      }
      // 2) Generate the random reset token
      const resetToken = user.createPasswordResetToken();
      await user.save({ validateBeforeSave: false });
    try {
      await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10 min)',
        message:`this is your token for reset your password  ${resetToken}`
      });

      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!'
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      console.log(err);
      res.status(500).json({
       status:"fail",
       error:"Internal server error"
      })
    }
}
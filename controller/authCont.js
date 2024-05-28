const User = require('../models/userModel.js');
const {generateToken} = require('../utils/jwt.js');
const sendEmail = require('../utils/email.js');
const crypto = require('crypto');
const catchAsync = require('../utils/catchAsync.js');
const appError = require('../utils/appError.js');

exports.signup = catchAsync(async(req,res,next)=>{
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
      // await sendEmail({
      //    email: response.email,
      //    subject: 'Welcome to our website',
      //    message: `Thank you for registering with us! and your token is here ${token}`
      //  });
   
       res.status(201).json({
       status:"success",
       token:token,
       response
       });
});

exports.login =  catchAsync(async(req,res,next)=>{
     const {email, password} = req.body;
     const user  = await User.findOne({email:email});

     // if email does not exist or pasword does not match , return error 
     if(!user || !(await user.comparePassword(password))){
       return next( new appError('Incorrect email or password',401))
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
});




exports.getALlData = catchAsync(async(req,res,next)=>{
       const userData  = await User.find();

       req.status(200).json({
         userData
       })
})
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
};

exports.resetPassword = catchAsync(async(req, res,next) => {
      // 1) Get user based on the token
        const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

        console.log(hashedToken);

      const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
      });

      // 2) If token has not expired, and there is user, set the new password
      if (!user) {
         return next(new appError('Token is invalid or has expired', 400));
      }
      user.password = req.body.password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      // 3) Update changedPasswordAt property for the user
      // 4) Log the user in, send JWT
      const payload = {
        id:user.id
      } 
      generateToken(payload);
      res.status(200).json({
        message:"done"
      })
});

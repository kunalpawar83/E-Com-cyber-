const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { productSc } = require('./productModel.js'); 
const crypto = require('crypto');

const userSc = new mongoose.Schema({
     userName:{
         type:String,
         required:[true,'Please enter your name'],
         trim:true,
         maxlength:[20,'Name must be less than 20 characters'],
         minlength:[3,'Name must be at least 3 characters']
     },
     email:{
        type:String,
        required:[true,'A user must have email'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please provide valid email']
     },
     photo: String,
     password:{
        type:String,
        required:[true,' A user must have password'],
        minlength:[8,'Password must be at least 8 characters']
     },
     mobile:{
      type:String,
      required:[true,' A user must have mobile number'],
      minlength:[10,'Mobile number must be 10 characters'],
      maxlength:[13,'Mobile number must be 10 characters']
     },
     address: {
      type: String,
      default: "",
    },
    cart: [
      {
        product: productSc,
        quantity: {
          type: Number,
          required:[true,'Product must have quantity'],
        },
      },
    ],
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
});

userSc.pre('save', async function(next) {
   const user = this;
   if(!user.isModified('password')){
     return next();
   }
   try{
     const salt  = await bcrypt.genSalt(9);

     const hashedPassword = await bcrypt.hash(user.password,salt);

     user.password = hashedPassword;
     next();
   }catch(err){
         return next(err)
   }
 
});

userSc.methods.comparePassword = async function(candidatePassword){
   try{
      const isMatch = await bcrypt.compare(candidatePassword,this.password);
      return isMatch;
   }catch(err){
      throw err;
   }
};

userSc.methods.createPasswordResetToken = function() {
   const resetToken = crypto.randomBytes(32).toString('hex');
 
   this.passwordResetToken = crypto
     .createHash('sha256')
     .update(resetToken)
     .digest('hex'); 
   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
 
   return resetToken;
 };


const User = mongoose.model('User',userSc);
module.exports =User;
 
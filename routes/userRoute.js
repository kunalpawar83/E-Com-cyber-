const express = require('express');
const {jwtAuthMiddleware} = require('../utils/jwt.js');
const AuthCont = require('../controller/authCont.js');
const UserCont  = require('../controller/userCont.js');
const multer = require('multer');

const multerStorage = multer.diskStorage({
   destination:(req,file,cb)=>{
       cb(null,'imgUser');
   },
   filename:(req,file,cb)=>{
      const ext = file.mimetype.split('/')[1];
      cb(null,`user-${Date.now()}.${ext}`);
   }
});

const multerFilter = (req,file,cb)=>{
   if(file.mimetype.startsWith('image')){
      cb(null,true);
   }else{
      cb('Not a image ! please upload image',false);
   }
}

const upload =  multer({
   storage:multerStorage,
   fileFilter:multerFilter   
});


const router = express.Router();

//  SIGNUP ROUTE
router.post('/signup',AuthCont.signup);
// login Route
router.post('/login',AuthCont.login);
// get user route
router.get('/getuser',jwtAuthMiddleware,UserCont.getData);
// user update route
router.put('/updateuser',jwtAuthMiddleware,UserCont.updateUser);
// user delete route 
router.delete('/deleteuser',jwtAuthMiddleware,UserCont.deleteUser);

// password routes 
// forget password  route 
router.post('/forgetpassword',AuthCont.forgetPassword);
// reset toekn route 
router.patch('/resetpassword/:token',AuthCont.resetPassword);

// add to cart 
router.post('/addtocart',jwtAuthMiddleware,UserCont.addToCart);

// get cart
router.get('/getcart',jwtAuthMiddleware,UserCont.getCart);

// remove from cart
router.delete('/removefromcart/:id',jwtAuthMiddleware,UserCont.removeFromCart);

// wishlist
router.post('/addtowishlist/:id',jwtAuthMiddleware,UserCont.addToWishlist);
router.get('/getwishlist/:id',jwtAuthMiddleware,UserCont.getaAllWishlist);
//router.delete('/removewishlist/:id',jwtAuthMiddleware,UserCont.removeWishlist);


module.exports =router;

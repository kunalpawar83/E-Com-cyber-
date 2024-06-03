const { assertEnabled } = require('firebase-tools/lib/experiments.js');
const User =  require('../models/userModel.js');
const {Product} = require('../models/productModel.js');
const catchAsync = require('../utils/catchAsync.js');
const Cart = require('../models/cartModel.js');
const appError = require('../utils/appError.js');
const Wishlist = require('../models/wishlistModel.js');


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

// add to cart 
exports.addToCart = catchAsync(async(req,res,next)=>{
    const cartItem = new Cart({quantity:req.body.quantity,productId:req.params.id,userId:req.user.id});
    await cartItem.save();
    res.status(201).send(cartItem);
});

// remove from cart
exports.removeFromCart = catchAsync(async(req,res,next)=>{
    const userId = req.user.id;
    const productId = req.params.id;
    const cartData = await Cart.findOne({userId:userId});
    if(!cartData){
        return next(new appError('Cart not found with that Id !',404))
    }
    const response = await Cart.findOneAndUpdate({userId:userId},{
        $pull:{ 
            products:{
                productId:productId
            }
        }   
    });
    res.status(201).json({  
        status:"success",
        data:response
    })
}); 


// get cart
exports.getCart = catchAsync(async(req,res,next)=>{
    const cartItems = await Cart.find({ userId:req.user.id }).populate('productId');
    console.log(cartItems);
    if(!cartItems){
        return next(new appError('Cart not found with that Id !',404))
    }
    console.log(cartItems);
    res.status(201).json({  
        status:"success",
        data:cartItems
    })
});

// wishlist

exports.addToWishlist = catchAsync(async(req,res,next)=>{ 
    const { user, product} = req.body;
    const newWishlist = new Wishlist({ user,product });
    newWishlist.user =  req.user.id;
    newWishlist.product = req.params.id;
    await newWishlist.save();

    res.status(201).json(newWishlist);

});
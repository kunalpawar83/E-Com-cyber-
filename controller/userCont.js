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
    const userId = req.user.id
    console.log(userId)
    if (!userId){
        return next(new appError('No such user Found',400))
    }
    // console.log(userId);
    const userAvailable = await User?.findById(userId)
    if(!userAvailable){
        return res.status(400).send({ status: false, message: "Invalid user" });
    }
    let {productId, quantity, title, price, image} = req.body
        if (!productId){
            return res.status(400).send({ status: false, message: "Invalid product" });
        }
    let productAvailable = await Product?.findOne({_id: req.body.productId});
    let cart = await Cart.findOne({ userId: userId });
        if (cart) {
            let itemIndex = cart.products.findIndex((p) => p.productId == productId);
                if (itemIndex > -1) {
                    let productItem = cart.products[itemIndex];
                    productItem.quantity += quantity;
                    if(cart.total === 0){
                        cart.total = productItem.price;
                    }
                    cart.total += quantity * productItem.price*1;
                    cart.products[itemIndex] = productItem;
                } else {
                    await cart.products.push({ productId: productId, quantity: quantity, title: title, image: image, price: price });
                }
            cart = await cart.save();
            return res.status(200).send({ status: true, updatedCart: cart });
        } else {
            let  newCart = await Cart.create({
            userId,
            products: [{ productId: productId, quantity: quantity, title: title, image: image, price: price }],
     });
     return res.status(201).send({ status: true, newCart:newCart });
    }
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
    const userId = req.user.id
    if (!userId){
        res.status(400)
        throw new Error('No such user Found')
    }
    const userAvailable = await User?.findById(userId);
    let cart = await Cart.findOne({ userId: userId });
    if (!cart)
      return res
        .status(404)
        .send({ status: false, message: "Cart not found for this user" });
    // console.log(cart.products.length);
    cartCount = cart.products.length
  
    res.status(200).send({ status: true, cart: cart, cartCount: cartCount });
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
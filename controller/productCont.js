const { promises } = require('nodemailer/lib/xoauth2/index.js');
const {Product} = require('../models/productModel.js');
const { startSession } = require('mongoose');
const catchAsync = require('../utils/catchAsync.js');
const appError = require('../utils/appError.js');
const Rating = require('../models/ratingModel.js');

// create product
exports.createProduct = catchAsync(async(req,res,next)=>{
        //const dataFile =  req.file.path;
        //req.body.image = dataFile;
        const userData = req.body;
        const newUser = Product(userData);
        const response = await newUser.save();
        res.status(201).json({
            status:"success",
            response
        })
});

// get all product 
exports.getAllProduct = catchAsync(async(req, res,next)=>{
    const { category , name } = req.query
    console.log(name);
    const filter = {};
    if (category) {
      filter.category = category;
    }
    const productData= await Product.find(filter);
    res.status(200).json({
        productData
    })
});

// get product 
exports.getProduct = catchAsync(async(req,res,next)=>{
        const productData = await Product.findById(req.params.id);
        if(!productData){
           return next(new appError('product not found!',404))
        };
        res.status(200).json({
            productData
        })
});

// update product
exports.updateProduct = catchAsync(async(req,res,next)=>{
        const productId  = req.params.id;
        const productData = req.body;
        
        const response = await Product.findByIdAndUpdate(productId,productData,{
          new:true,
          runValidators:true
        })
        if(!response){
            return next(new appError('product not found!',404))
        }
        res.status(200).json({
         data:response
     })
});

// delete product
exports.deleteProduct = catchAsync(async(req,res,next)=>{
        const productData = await Product.findByIdAndDelete(req.params.id);
        if(!productData){
            return next(new appError('product not found!',404))
        }
        res.status(200).json({
            message:"done"
        })
});


// product rating
exports.ratingProduct = catchAsync(async(req,res,next)=>{
    const { user, rating, review, productId } = req.body;
    const newRating = new Rating({ user, rating, review, productId });
    newRating.user =  req.user.id;
    newRating.productId = req.params.id;
    await newRating.save();

    res.status(201).json(newRating);
});

exports.getaAllRating = catchAsync(async(req,res,next)=>{
    const productId = req.params.id;
    const ratingData = await Rating.find({ productId });
    if(!ratingData){
        return next(new appError('rating not found!',404)) 
    }
    res.status(200).json({
        ratingData
    })
});

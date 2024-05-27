const { promises } = require('nodemailer/lib/xoauth2/index.js');
const {Product} = require('../models/productModel.js');
const { startSession } = require('mongoose');
const catchAsync = require('../utils/catchAsync.js');
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
            res.status(404).json({
                error:"product not found with that id , Please send valid id"
            })
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
         return res.status(404).json({
             error:"product not found with that id , Please send valid id"
         })
        }
        res.status(200).json({
         data:response
     })
});

// delete product
exports.deleteProduct = catchAsync(async(req,res)=>{
        const productData = await Product.findByIdAndDelete(req.params.id);
        if(!productData){
            res.status(404).json({
                error:"product not found with that id "
            })
        }
        res.status(200).json({
            message:"done"
        })
});

//product rating 

exports.productRating = async(req,res)=>{
    try {
        const { id, rating } = req.body;
        let product = await Product.findById(id);
    
        for (let i = 0; i < product.rating.length; i++) {
          if (product.rating[i].userId == req.user.id) {
            product.rating.splice(i, 1);
            break;
          }
        }
    
        const ratingSchema = {
          userId: req.user,
          rating,
        };
    
        product.rating.push(ratingSchema);
        product = await product.save();
        res.status(201).json({
            product
        })
      } catch (e) {
        res.status(500).json({ error: e.message });
      }
};

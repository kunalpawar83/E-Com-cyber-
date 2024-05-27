const Category = require('../models/categoryModel.js');
const catchAsync = require('../utils/catchAsync.js');
const appError = require('../utils/appError.js');

// create category
exports.createCategory = catchAsync(async(req,res,next)=>{
        const categoryData = req.body;
        const newCategory = Category(categoryData);
        const Data = await newCategory.save();

        res.status(201).json({
            Data
        })
});

exports.getAllCategory = catchAsync(async(req,res,next)=>{
    const categoryData = await Category.find();
    res.status(200).json({
        categoryData
    })
});
const Category = require('../models/categoryModel.js');

// create category
exports.createCategory = async(req,res)=>{
    try{
        const categoryData = req.body;
        const newCategory = Category(categoryData);
        const Data = await newCategory.save();

        res.status(201).json({
            Data
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"internal server error"
        })
    }
};

exports.getAllCategory = async(req,res)=>{
    try{
        const categoryData = await Category.find();
        res.status(200).json({
            categoryData
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"internal server error"
        })
    }
}
const Product = require('../models/productModel.js');

exports.createProduct = async(req,res)=>{
    res.status(200).json({
        status:"success",
        message:"just for test"
    })
};

exports.getAllProduct = async(req, res)=>{
    res.status(200).json({
        status:"success",
        message:"just for test"
    })
};

exports.getProduct = async(req,res)=>{
    res.status(200).json({
        status:"success",
        message:"just for test"
    })
};

exports.updateProduct = async(req,res)=>{
    res.status(200).json({
        status:"success",
        message:"just for test"
    })
};

exports.deleteProduct = async(req,res)=>{
    res.status(200).json({
        status:"success",
        message:"just for test"
    })
}
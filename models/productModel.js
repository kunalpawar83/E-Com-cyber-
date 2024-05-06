const mongoose  = require('mongoose');
const productSc =  new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    image:{
            type:String,
            required:true
        },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    ratings:{
        type:Number,
        required:true
    }
});

const Product = new mongoose.model('Product',productSc);
module.exports = Product;




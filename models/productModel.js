const mongoose  = require('mongoose');
const ratingSc  =  require('./ratingModel.js');


const productSc =  new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Product must have name'],
        trim:true
    },
    description:{
        type:String,
        required:[true,'Product must have description'],
        trim:true
    },
    image:{
            type:String,
            required:[true,'Product must have image']
    },
    quantity:{
        type:Number,
        required:[true,'Product must have quantity']
    },
    price:{
        type:String,
        required:[true,'Product must have price']
    },
    category:{
        type:String,
        required:[true,'Product must have category']
    },
    ratings:[ ratingSc ]
});

const Product = new mongoose.model('Product',productSc);
module.exports = {Product ,productSc };




const mongoose  = require('mongoose');


const productSc =  new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    catcategory:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
        required:true
    },
    MRP:{
        type:Number,
        required:true
    },
    discount:{
        type:String
    },
    offerPrice:{
        type:Number
    },
    detail:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    rating:{
        type:String
    }
})
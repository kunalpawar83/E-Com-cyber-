const mongoose  = require('mongoose');

const categorySc =  new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter category name']
    },
    image:{
        type:String,
        required:[true,'category must have image']
    }
});




const Category = new mongoose.model('Category',categorySc);
module.exports = Category;



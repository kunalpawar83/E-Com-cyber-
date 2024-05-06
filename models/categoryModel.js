const mongoose  = require('mongoose');

const categorySc =  new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
});


const Category = new mongoose.model('Category',categorySc);
module.exports = Category;



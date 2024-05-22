const mongoose  = require('mongoose');

const ratingSc =  new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    }
});

module.exports = ratingSc;

const mongoose  = require('mongoose');

const ratingSc =  new mongoose.Schema({
    userid:{
        type:String,
        required:[true,' Please enter your id']
    },
    rating:{
        type:Number,
        required:[true,'Product must have rating']
    }
});

module.exports = ratingSc;

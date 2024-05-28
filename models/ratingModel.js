const mongoose  = require('mongoose');

const ratingSc =  new mongoose.Schema({
    userId:{
        type:String,
        required:[true,' Please enter your id']
    },
    rating:{
        type:Number,
        required:[true,'Product must have rating'],
        min:[1,'Rating must be above 1'],
        max:[5,'Rating must be below 5']
    }
});

module.exports = ratingSc;

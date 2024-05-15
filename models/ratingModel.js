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


const Rating = new mongoose.model('Rating',ratingSc);
module.exports = Rating;

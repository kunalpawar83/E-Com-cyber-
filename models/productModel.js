const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const productSc =  new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Product must have name'],
        trim:true
    },
    description:{
        type:String,
        required:[true,'Product must have description'],
        trim:true,
        min:[3,'Description must be at least 3 characters'],
        max:[1000,'Description must be less than 1000 characters']

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
    ratings:[{ type: Schema.Types.ObjectId, ref: 'Rating' }]
});

const Product = new mongoose.model('Product',productSc);
module.exports = {Product,productSc};




const mongoose = require('mongoose');
const Schema = mongoose.Schema
const { Product } = require('./productModel.js');
const User = require('./userModel.js');


const wishlistSchema = new mongoose.Schema({
    user:{ type: Schema.Types.ObjectId, ref: 'User', required: true },
    product:Array,
    createdAt: {
        type: Date,
        default: Date.now
    }
});


wishlistSchema.pre('save', async function(next) {
    const product = this.product.map(async id => await Product.findById(id));
    this.product  = await Promise.all(product);
    next();
});

const Wishlist  =  mongoose.model('Wishlist', wishlistSchema);      
module.exports = Wishlist

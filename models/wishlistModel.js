const mongoose = require('mongoose');
const Schema = mongoose.Schema
const { Product } = require('./productModel.js');
const User = require('./userModel.js');

const wishlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        description: { type: String },
        price: { type: Number },
        image: { type: String },
      },
    ],
});


// wishlistSchema.pre('save', async function(next) {
//     const product = this.product.map(async id => await Product.findById(id));
//     this.product  = await Promise.all(product);
//     next();
// });

const Wishlist  =  mongoose.model('Wishlist', wishlistSchema);      
module.exports = Wishlist

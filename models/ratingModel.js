const mongoose = require('mongoose');
const Schema = mongoose.Schema
const { Product } = require('./productModel.js');
const User = require('./userModel.js');


const ratingSchema = new mongoose.Schema({
    user: Array,
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5  // Adjust for your desired rating scale
    },
    review: {
        type: String,
        maxlength: 250  // Optional limit for review length
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

ratingSchema.pre('save', async function(next) {
    const user = this.user.map(async id => await User.findById(id));
    this.user  = await Promise.all(user);
    next();
});

const Rating  =  mongoose.model('Rating', ratingSchema);
module.exports = Rating
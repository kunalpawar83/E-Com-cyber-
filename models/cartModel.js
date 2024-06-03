const mongoose = require('mongoose');
const {Product} = require('./productModel.js');

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Reference to User model if applicable
    },
    products: [
        {
            productId:Array,
            quantity: {
                type: Number,
                required: true,
                default: 1,
                min: 1
            },
            price: {  // Add price field to store product price
                type: Number,
                required: true
            }
        }
    ]
});

// CartSchema.pre('save', async function(next) {
//     const product = this.products[0].productId[0].map(async id => await Product.findById(id));
//     this.products[0].productId[0]  = await Promise.all(product);
//     console.log(products[0].productId[0]);
//     next();
// });

const Cart  = new mongoose.model('Cart', CartSchema);
module.exports = Cart;

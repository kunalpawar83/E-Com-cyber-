const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Reference to User model if applicable
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product' // Reference to Product model if needed
            },
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

const Cart  = new mongoose.model('Cart', CartSchema);

module.exports = Cart;

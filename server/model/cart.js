const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
    created: {
        type: Date
    }
});

CartSchema.pre('save', function (next) {
    var cart = this;
    cart.created = new Date();
    next();
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = {Cart};
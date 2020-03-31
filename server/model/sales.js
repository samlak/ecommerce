const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    created: {
        type: Date
    }
});

SalesSchema.pre('save', function (next) {
    var sales = this;
    sales.created = new Date();
    next();
});

const Sales = mongoose.model('Sales', SalesSchema);

module.exports = {Sales};
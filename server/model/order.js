const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    sales: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sales',
    }],
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
    },
    status: {
        type: String,
        required: true,
        trim: true, 
    }
});

OrderSchema.pre('save', function (next) {
    var order = this;
    order.created = new Date();
    next();
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = {Order};
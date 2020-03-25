const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    sales: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sales',
    }],
    status: {
        type: String,
        required: true,
        trim: true, 
    }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = {Order};
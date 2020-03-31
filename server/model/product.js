const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    merchant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Merchant',
    },
    name: {
        type: String,
        required: true,
        trim: true, 
    },
    description: {
        type: String,
        required: true,
        trim: true, 
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
        trim: true, 
    },
    review: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        comment: {
            type: String,
            required: true,
            trim: true, 
        }
    }],
    rating: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        rating: {
            type: Number,
            required: true,
        }
    }],
    created: {
        type: Date
    }
});

ProductSchema.pre('save', function (next) {
    var product = this;
    product.created = new Date();
    next();
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = {Product};
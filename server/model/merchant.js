const mongoose = require('mongoose');

const MerchantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true, 
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    logo: {
        type: String,
        required: false,
        trim: true
    },
    created: {
        type: Date
    }
});

MerchantSchema.pre('save', function (next) {
    var merchant = this;
    merchant.created = new Date();
    next();
});

const Merchant = mongoose.model('Merchant', MerchantSchema);

module.exports = {Merchant};
var mongoose = require('mongoose');
 
var PriceMappingSchema = new mongoose.Schema({
 
    center: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        default: 1,
        required: true,
    },
    registration_fee: {
        type: Number,
        default: 0,
        required: true,
    },
    kit_fee: {
        type: Number,
        default: 0,
        required: true,
    },
    extra_fee: {
        type: Number,
        default: 0,
        required: true,
    },
    total_fee: {
        type: Number,
        default: 0,
        required: true,
    },
    max_discount: {
        type: Number,
        default: 0,
        required: true,
    }

}, {
    timestamps: true
});
 
module.exports = mongoose.model('PriceMapping', PriceMappingSchema);
var mongoose = require('mongoose');
 
var PostOrderSchema = new mongoose.Schema({
 
    center: {
        type: String,
        required: true,
    },
    order_date: {
        type: Date,
        required: true,
        default: new Date(),
    },
    total_amount: {
        type: Number,
        required: true,
        default: 0,
    },
    products: {
        type: Array,
    },
    payment_method: {
        type: String,
    },
    payment_date: {
        type: Date,
    },
    bank_name: {
        type: String,
    },
    transaction_no: {
        type: String,
    },
    remarks: {
        type: String,
    },
    dispatched: {
        type: Array,
    },

}, {
    timestamps: true
});
 
module.exports = mongoose.model('PostOrder', PostOrderSchema);

/* product:{ course, level, price, quantity, total_price } */
/* dispatched: {
    dispatch_date, dispatch_method, dispatch_number, remarks, received_date, is_received,
    products: {course, level, quantity_sent, quantity_received}
} */
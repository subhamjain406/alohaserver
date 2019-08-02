var mongoose = require("mongoose");

var PassbookSchema = new mongoose.Schema({
    center: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    credit: {
        type: Number,
    },
    debit: {
        type:Number,
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
    },
    action_type: {
        type: String,
    }
},{
    timestamps:true
});

module.exports = mongoose.model('Passbook', PassbookSchema);
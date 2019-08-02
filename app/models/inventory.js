var mongoose = require("mongoose");

var InventorySchema = new mongoose.Schema({
    center: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    available_inventory: {
        type: Number,
        required: true,
        default: 0,
    },
    ordered_inventory: {
        type: Number,
        required: true,
        default: 0,
    },
    dispatched_inventory: {
        type: Number,
        required: true,
        default: 0,
    },
    inventory_log: {
        type: Array,
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Inventory', InventorySchema);
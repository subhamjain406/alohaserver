var mongoose = require('mongoose');

var ProgramSchema = new mongoose.Schema({

    program_name: {
        type: String,
        required: true,
    },
    program_code: {
        type: String,
        required: true,
        index: { unique: true },
    },
    no_of_sessions: {
        type: Number,
        required: true,
    },
    months_per_level: {
        type: Number,
        required: true,
    },
    total_levels: {
        type: Number,
        required: true,
    },
    registration_kit: {
        type: Array,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    }
    
}, {
        timestamps: true
    });

module.exports = mongoose.model('Program', ProgramSchema);
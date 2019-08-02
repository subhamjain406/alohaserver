var mongoose = require('mongoose');

var NotificationsSchema = new mongoose.Schema({

    center_id: {
        type: String,
        required: true,
    }
}, {
        timestamps: true
    });

module.exports = mongoose.model('Notifications', NotificationsSchema);
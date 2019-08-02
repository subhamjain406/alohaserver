var Notifications = require("../models/notifications");

exports.getNotification = function (req, res, next) {
    Notifications.find(function (err, notifications) {
        if (err) { res.send(err); }
        res.json(notifications);
    });
}

exports.createNotification = function (req, res, next) {
    let notification = req.body;
    Notifications.create(notification, function (err, notification) {
        if (err) { res.send(err); }
        Notifications.find(function (err, notifications) {
            if (err) { res.send(err); }
            res.json(notifications);
        });
    });
}

exports.updateNotification = function (req, res, next) {
    let id = req.body._id;
    let notification = req.body;
    delete notification._id;

    Notifications.findOneAndUpdate({ _id: id }, notification, { upsert: true, new: true }, function (err, notification) {
        if (err) { return res.send(err); }
        Notifications.find(function (err,notifications) {
            if (err){ res.send(err); }
            res.json(notifications);
        });
    });
}
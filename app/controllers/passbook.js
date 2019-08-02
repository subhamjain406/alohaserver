var PassBook = require("../models/passbook");

exports.getPassBook = function (req, res, next) {
    PassBook.find(function (err, passbooks) {
        if (err) { res.send(err); }
        res.json(passbooks);
    });
}

exports.createPassBook = function (req, res, next) {
    let passBookData = req.body;
    PassBook.create(passBookData, function (err, passbook) {
        if (err) { res.send(err); }
        PassBook.find(function (err, passbooks) {
            if (err) { res.send(err); }
            res.json(passbooks);
        });
    });
}

exports.updatePassBook = function (req, res, next) {
    let id = req.body._id;
    let passBookData = req.body;
    delete passBookData._id;

    PassBook.findOneAndUpdate({ _id: id }, passBookData, { upsert: true, new: true }, function (err, passbook) {
        if (err) { return res.send(err); }
        PassBook.find(function (err,passbooks) {
            if (err){ res.send(err); }
            res.json(passbooks);
        });
    });
}
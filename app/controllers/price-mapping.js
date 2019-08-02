var PriceMapping = require("../models/price-mapping");

exports.getPriceMapping = function (req, res, next) {
    PriceMapping.find(function (err, price_mappings) {
        if (err) { res.send(err); }
        res.json(price_mappings);
    });
}

exports.createPriceMapping = function (req, res, next) {
    let priceMapping = req.body;
    PriceMapping.create(priceMapping, function (err, price_mapping) {
        if (err) { res.send(err); }
        PriceMapping.find(function (err, price_mappings) {
            if (err) { res.send(err); }
            res.json(price_mappings);
        });
    });
}

exports.updatePriceMapping = function (req, res, next) {
    let id = req.body._id;
    let priceMapping = req.body;
    delete priceMapping._id;

    PriceMapping.findOneAndUpdate({ _id: id }, priceMapping, { upsert: true, new: true }, function (err, price_mapping) {
        if (err) { return res.send(err); }
        PriceMapping.find(function (err,price_mappings) {
            if (err){ res.send(err); }
            res.json(price_mappings);
        });
    });
}
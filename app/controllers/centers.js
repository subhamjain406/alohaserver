var Center = require('../models/center');
 
exports.getCenters = function(req, res, next) {
    console.log('hi');
    Center.find(function(err, centers) {
        if (err) { res.send(err); }
        res.json(centers);
    });
}
 
exports.createCenter = function(req, res, next) {
    let center = req.body;
    Center.create(center, function(err, center) {
        if (err) { res.send(err); }
        Center.find(function(err, centers) {
            if (err){ res.send(err); }
            res.json(centers);
        });
    });
}
 
exports.updateCenter = function(req, res, next) {
    let id = req.body._id;
    let center = req.body;
    delete center._id;

    console.log(center);
    console.log(id);

    Center.findOneAndUpdate( {_id: id}, center, {upsert: true, new: true}, function(err, center) {
        if (err) { res.send(err); }
        Center.find(function(err, centers) {
            if (err){ res.send(err); }
            res.json(centers);
        });
    });
}
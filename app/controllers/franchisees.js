var Franchise = require('../models/franchise');
 
exports.getFranchisees = function(req, res, next) {
    Franchise.find(function(err, franchisees) {
        if (err) { res.send(err); }
        res.json(franchisees);
    });
}
 
exports.createFranchise = function(req, res, next) {
    let franchise = req.body;
    Franchise.create(franchise, function(err, franchise) {
        if (err) { res.send(err); }
        Franchise.find(function(err, franchisees) {
            if (err){ res.send(err); }
            res.json(franchisees);
        });
    });
}
 
exports.updateFranchise = function(req, res, next) {
    let id = req.body._id;
    let franchise = req.body;
    delete franchise._id;

    console.log(franchise);
    console.log(id);

    Franchise.findOneAndUpdate( {_id: id}, franchise, {upsert: true, new: true}, function(err, franchise) {
        if (err) { res.send(err); }
        Franchise.find(function(err, franchisees) {
            if (err){ res.send(err); }
            res.json(franchisees);
        });
    });
}
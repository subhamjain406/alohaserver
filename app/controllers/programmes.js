var Program = require('../models/program');
 
exports.getProgrammes = function(req, res, next) {
    Program.find(function(err, programmes) {
        if (err) { res.send(err); }
        res.json(programmes);
    });
}
 
exports.createProgram = function(req, res, next) {
    let program = req.body;
    Program.create(program, function(err, program) {
        if (err) { res.send(err); }
        Program.find(function(err, programmes) {
            if (err){ res.send(err); }
            res.json(programmes);
        });
    });
}
 
exports.updateProgram = function(req, res, next) {
    let id = req.body._id;
    let program = req.body;
    delete program._id;

    console.log(program);
    console.log(id);

    Program.findOneAndUpdate( {_id: id}, program, {upsert: true, new: true}, function(err, program) {
        if (err) { res.send(err); }
        Program.find(function(err, programmes) {
            if (err){ res.send(err); }
            res.json(programmes);
        });
    });
}
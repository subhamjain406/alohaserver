var Instructor = require('../models/instructor');
 
exports.getInstructors = function(req, res, next) {
    Instructor.find(function(err, instructors) {
        if (err) { res.send(err); }
        res.json(instructors);
    });
}
 
exports.createInstructor = function(req, res, next) {
    let instructor = req.body;
    Instructor.create(instructor, function(err, instructor) {
        if (err) { res.send(err); }
        Instructor.find(function(err, instructors) {
            if (err){ res.send(err); }
            res.json(instructors);
        });
    });
}
 
exports.updateInstructor = function(req, res, next) {
    let id = req.body._id;
    let instructor = req.body;
    delete instructor._id;

    console.log(instructor);
    console.log(id);

    Instructor.findOneAndUpdate( {_id: id}, instructor, {upsert: true, new: true}, function(err, instructor) {
        if (err) { res.send(err); }
        Instructor.find(function(err, instructors) {
            if (err){ res.send(err); }
            res.json(instructors);
        });
    });
}
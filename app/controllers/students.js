var Student = require('../models/student');

exports.getStudent = function (req, res, next) {
    Student.find(function (err, students) {
        if (err) { res.send(err); }
        res.json(students);
    });
}

exports.createStudent = function (req, res, next) {
    let student = req.body;
    Student.create(student, function (err, student) {
        if (err) { res.send(err); }
        Student.find(function (err, students) {
            if (err) { res.send(err); }
            res.json(students);
        });
    });
}

exports.updateStudent = function (req, res, next) {
    let id = req.body._id;
    let student = req.body;
    delete student._id;

    Student.findOneAndUpdate({ _id: id }, student, { upsert: true, new: true }, function (err, student) {
        if (err) { res.send(err); }
        Student.find(function (err, students) {
            if (err) { res.send(err); }
            res.json(students);
        });
    });
}

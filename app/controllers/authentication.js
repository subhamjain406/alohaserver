var jwt = require('jsonwebtoken');
var User = require('../models/user');
var authConfig = require('../../config/auth');
var speakeasy = require('speakeasy');
var nodemailer = require('nodemailer');
var fs = require('fs');
var path = require("path");
var bcrypt = require('bcrypt');
var sgMail = require('@sendgrid/mail');

var apiKey = "SG";
apiKey += ".Jy";
apiKey += "-SHrC";
apiKey += "-TOmdhaQO";
apiKey += "_WEApA";
apiKey += ".LybA2o2680TaJN3qyr";
apiKey += "_b8XPISnq";
apiKey += "_R0fjXb1pq9tLYM4";
sgMail.setApiKey(apiKey);

function generateToken(user) {
    console.log("Generating Token for user " + user.email);
    return jwt.sign(user, authConfig.secret, {
        expiresIn: 10080
    });
}

exports.getUsers = function (req, res, next) {
    console.log('1');
    console.log("Getting list of all user ");
    User.find(function (err, users) {
        if (err) { res.send(err); }
        res.json(users);
    });
}

function setUserInfo(request) {
    console.log("Setting User Info for " + request.email);
    return {
        _id: request._id,
        name: request.name,
        user_name: request.user_name,
        email: request.email,
        password: request.password,
        role: request.role,
        dob: request.dob,
        gender: request.gender,
        phone_no: request.phone_no,
        profile_pic: request.profile_pic,
        user_state: request.user_state,
        user_district: request.user_district,
        user_center: request.user_center,
        active: request.active
    };
}

exports.login = function (req, res, next) {
    console.log("Logging in for user " + req);
    User.findOne({ email: req.body.email }, function (err, existingUser) {
        if (err) return next(err);
        if (existingUser && existingUser.active) {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) return next(err);
                // if (hash != existingUser.password) return next('Password mismatch');
                // else {
                    var userInfo = setUserInfo(existingUser);
                    console.log(userInfo);
                    res.status(200).json({
                        token: 'JWT ' + generateToken(userInfo),
                        user: userInfo
                    });
                // }
            });
        } else {
            return next('No user');
        }
    });
}

exports.forgotPassword = function (req, res, next) {
    var email = req.body.email;
    if (!email) {
        return res.status(422).send({ error: 'You must enter an email address' });
    }
    User.findOne({ email: email }, function (err, existingUser) {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            var secret = speakeasy.generateSecret({ length: 20 });
            var token = speakeasy.totp({
                secret: secret.base32,
                encoding: 'base32'
            });
            console.log(token);

            bcrypt.hash(token, 10, function (err, hash) {
                existingUser.password = hash;
                console.log(existingUser.password);
                var id = existingUser._id;
                delete existingUser._id;

                console.log(id);
                console.log(existingUser);

                User.findOneAndUpdate({ _id: id }, existingUser, { upsert: true, new: true }, function (err, user) {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    console.log(user);
                    sendMail(user, token);
                    var userInfo = setUserInfo(user);
                    res.status(201).json({
                        token: 'JWT ' + generateToken(userInfo),
                        user: userInfo
                    })
                });
            });

        }
    });
}

exports.register = function (req, res, next) {
    var name = req.body.name;
    var user_name = req.body.user_name;
    var email = req.body.email;
    var password = req.body.password;
    var confirm_password = req.body.confirm_password;
    var phone_no = req.body.phone_no;
    var gender = req.body.gender;
    var role = req.body.role;
    var dob = req.body.dob;
    var profile_pic = req.body.profile_pic;
    var user_state = req.body.user_state;
    var user_district = req.body.user_district;
    var user_center = req.body.user_center;
    var active = req.body.active;

    if (!email) {
        return res.status(422).send({ error: 'You must enter an email address' });
    }
    if (!password) {
        return res.status(422).send({ error: 'You must enter a password' });
    }
    User.findOne({ email: email }, function (err, existingUser) {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            return res.status(422).send({ error: 'That email address is already in use' });
        }
        var user = new User({
            name: name,
            user_name: user_name,
            email: email,
            password: password,
            confirm_password: confirm_password,
            phone_no: phone_no,
            gender: gender,
            role: role,
            dob: dob,
            profile_pic: profile_pic,
            user_state: user_state,
            user_district: user_district,
            user_center: user_center,
            active: active
        });
        user.save(function (err, user) {
            if (err) {
                return next(err);
            }
            var userInfo = setUserInfo(user);
            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            })
        });
    });
}

exports.update = function (req, res, next) {
    var name = req.body.name;
    var user_name = req.body.user_name;
    var email = req.body.email;
    var password = req.body.password;
    var confirm_password = req.body.confirm_password;
    var phone_no = req.body.phone_no;
    var gender = req.body.gender;
    var role = req.body.role;
    var dob = req.body.dob;
    var profile_pic = req.body.profile_pic;
    var user_state = req.body.user_state;
    var user_district = req.body.user_district;
    var user_center = req.body.user_center;
    var active = req.body.active;

    if (!email) {
        return res.status(422).send({ error: 'You must enter an email address' });
    }
    User.findOne({ email: email }, function (err, existingUser) {
        if (err) {
            return next(err);
        }

        var id = existingUser._id;
        delete existingUser._id;
        delete existingUser.__v;

        console.log(password);

        bcrypt.hash(password, 10, function (err, hash) {
            existingUser.email = email;
            if (req.body.password != "") existingUser.password = hash;
            existingUser.name = name;
            existingUser.user_name = user_name;
            existingUser.email = email;
            existingUser.phone_no = phone_no;
            existingUser.gender = gender;
            existingUser.role = role;
            existingUser.dob = dob;
            existingUser.profile_pic = profile_pic;
            existingUser.user_state = user_state;
            existingUser.user_district = user_district;
            existingUser.user_center = user_center;
            existingUser.active = active;

            console.log(existingUser);

            User.findOneAndUpdate({ _id: id }, existingUser, { upsert: true, new: true }, function (err, user) {
                if (err) {
                    return next(err);
                }
                var userInfo = setUserInfo(user);
                res.status(201).json({
                    // token: 'JWT ' + generateToken(userInfo),
                    user: userInfo
                })
            });

        });

    });
}

exports.delete = function (req, res, next) {
    var email = req.body.email;

    if (!email) {
        return res.status(422).send({ error: 'You must enter an email address' });
    }

    User.findOne({ email: email }, function (err, existingUser) {
        if (err) {
            return next(err);
        }

        User.deleteOne({ email: email }, function (err, userInfo) {
            if (err) throw err;
            console.log("1 document deleted");
            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            })
        });

    });
}

exports.roleAuthorization = function (roles) {

    return function (req, res, next) {

        var user = req.user;

        User.findById(user._id, function (err, foundUser) {

            if (err) {
                res.status(422).json({ error: 'No user found.' });
                return next(err);
            }

            if (roles.indexOf(foundUser.role) > -1) {
                return next();
            }

            res.status(401).json({ error: 'You are not authorized to view this content' });
            return next('Unauthorized');

        });

    }

}

sendMail = function (user, token) {
    console.log("Sending mail on reset password to " + user.name);
    var stringTemplate = "Dear " + user.name +
        "<br/> You requested for new password. Your new password is: <br/> <strong>"
        + token + "</strong> <br/> You can change your password after logging in from update profile section."
        + "<br/> If you have any issues logging in, please contact Head Office.";

    var mailOptions = {
        to: user.email,
        from: 'donotreply@alohaindia.com',
        subject: 'Password reset for Aloha India console',
        html: stringTemplate,
    };

    sgMail.send(mailOptions, function (err) {
        if (err) console.log(err.response.body);
    });
}
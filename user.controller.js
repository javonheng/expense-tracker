var User = require('./user.dao');
const jwt = require('jsonwebtoken');
const secret = require('crypto').randomBytes(64).toString('hex');
const bcrypt = require('bcryptjs');

function generateAccessToken(username) {
    return jwt.sign(username, secret, {expiresIn: '1800s'});
}

exports.createUser = function (req, res, next) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            // Store hash in your password DB.
            var user = {
                user: req.body.user,
                password: hash
            };
            User.create(user, function(err, user) {
                if(err) {
                    res.json({
                        error : err
                    })
                    return;
                }
                res.json({
                    message : "User created successfully"
                })
            })
        });
    });

}

exports.getUsers = function(req, res, next) {
    User.get({}, function(err, user) {
        if(err) {
            res.json({
                error: err
            })
            return;
        }
        res.json({
            user: user
        })
    })
}

exports.getUser = function(req, res, next) {
    var newuser = {
        user: req.body.user,
        password: req.body.password
    };
    User.findOne({user: req.body.user}).then(user => {
        if (!user) {
            return res.status(404).json({ user: "User not found" });
          }
      // Check password
          bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (isMatch) {
              // User matched
                res.json({
                    token: "test123",
                    user: user,
                    ttl: 120
                })
            } else {
                return res.status(400).json({user: "Password is incorrect"});
            }
        })
    })
}

exports.updateUser = function(req, res, next) {

    User.findOne({user: req.body.user}).then(user => {
        if (!user) {
            return res.status(404).json({ user: "User not found" });
        }
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                // Store hash in your password DB.
                var newuser = {
                    user: req.body.user,
                    password: hash
                };
                User.update({_id: req.params.id}, newuser, function(err, user) {
                    if(err) {
                        res.json({
                            error : err
                        })
                        return;
                    }
                    res.json({
                        message : "User updated successfully",
                        user: user
                    })
                })
            });
        });
    })
}

exports.removeUser = function(req, res, next) {

    User.findOne({user: req.body.user}).then(user => {
        if (!user) {
            return res.status(404).json({ user: "User not found" });
        }
        User.delete({_id: req.params.id}, function(err, user) {
            if(err) {
                res.json({
                    error : err
                })
                return;
            }
            res.json({
                message : "User deleted successfully"
            })
        })
    })

}
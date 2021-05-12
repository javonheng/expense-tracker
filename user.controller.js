var User = require('./user.dao');
const jwt = require('jsonwebtoken');
const secret = require('crypto').randomBytes(64).toString('hex');

function generateAccessToken(username) {
    return jwt.sign(username, secret, {expiresIn: '1800s'});
}

exports.createUser = function (req, res, next) {
    var user = {
        user: req.body.user,
        password: req.body.password
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
    var user = {
        user: req.body.user,
        password: req.body.pass
    };
    // const token = generateAccessToken(user.user);
    User.getByName(user, function(err, user) {
        if(err) {
            res.json({
                error: err
            })
            return;
        }
        res.json({
            token: "test123",
            user: user[0],
            ttl: 120
        })
    })
}

exports.updateUser = function(req, res, next) {
    var updatedUser = {
        user: req.body.user,
        password: req.body.password
    }
    User.update({_id: req.params.id}, updatedUser, function(err, user) {
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
}

exports.removeUser = function(req, res, next) {
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
}
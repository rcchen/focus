var bcrypt_1 = require('bcrypt');
var express_1 = require('express');
var models_1 = require('../models');
exports.usersRouter = express_1.Router();
exports.usersRouter.get("/users", function (req, res) {
    models_1.User.find({}, function (err, users) {
        res.json(users);
    });
});
exports.usersRouter.post("/users", function (req, res) {
    var reqUser = req.body;
    models_1.User.findOne({ email: reqUser.email }, function (err, user) {
        if (user) {
            res.sendStatus(500);
        }
        else {
            bcrypt_1.hash(reqUser.password, 10, function (err, hash) {
                var newUser = new models_1.User({
                    email: reqUser.email,
                    password: hash
                });
                newUser.save(function (err, savedUser) {
                    res.json(savedUser);
                });
            });
        }
    });
});

var bcrypt_1 = require('bcrypt');
var express_1 = require('express');
var models_1 = require('../models');
exports.authRouter = express_1.Router();
exports.authRouter.post("/login", function (req, res) {
    var reqUser = req.body;
    models_1.User.findOne({ email: reqUser.email }, function (err, user) {
        if (user) {
            bcrypt_1.hash(reqUser.password, 10, function (err, hash) {
                if (user.password === hash) {
                }
            });
        }
        else {
            res.sendStatus(401);
        }
    });
});

var bodyParser = require("body-parser");
var bcrypt = require("bcrypt");
var express = require("express");
var models_1 = require("./models");
var app = express();
app.use(bodyParser.json());
app.get("/tags", function (req, res) {
    models_1.Tag.find({}, function (err, tags) {
        res.json(tags);
    });
    ;
});
app.post("/tags", function (req, res) {
    var tag = new models_1.Tag(req.body);
    tag.save(function (err, savedTag) {
        if (err) {
            res.json(500, err);
        }
        else {
            res.json(savedTag);
        }
    });
});
app.get("/photos", function (req, res) {
    models_1.Photo.find({}, function (err, photos) {
        if (err) {
            res.json(500, err);
        }
        else {
            res.json(photos);
        }
    });
});
app.post("/photos", function (req, res) {
});
app.get("/users", function (req, res) {
    models_1.User.find({}, function (err, users) {
        res.json(users);
    });
});
app.post("/users", function (req, res) {
    var reqUser = req.body;
    models_1.User.findOne({ email: reqUser.email }, function (err, user) {
        if (user) {
            res.sendStatus(500);
        }
        else {
            bcrypt.hash(reqUser.password, 10, function (err, hash) {
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
app.get("/reset", function (req, res) {
    var clearTags = models_1.Tag.remove({});
    var clearPhotos = models_1.Photo.remove({});
    var clearUsers = models_1.User.remove({});
    clearTags.exec();
    clearPhotos.exec();
    clearUsers.exec();
    res.sendStatus(200);
});
var server = app.listen(8080, function () {
    console.log("Server started at :%s", server.address().port);
});

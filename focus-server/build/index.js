var bodyParser = require("body-parser");
var bcrypt = require("bcrypt");
var express = require("express");
var models_1 = require("./models");
var app = express();
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080/");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var apiRouter = express.Router();
apiRouter.get("/tags", function (req, res) {
    models_1.Tag.find({}, function (err, tags) {
        res.json(tags);
    });
    ;
});
apiRouter.post("/tags", function (req, res) {
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
apiRouter.get("/photos", function (req, res) {
    models_1.Photo.find({}, function (err, photos) {
        if (err) {
            res.json(500, err);
        }
        else {
            res.json(photos);
        }
    });
});
apiRouter.post("/photos", function (req, res) {
});
apiRouter.get("/users", function (req, res) {
    models_1.User.find({}, function (err, users) {
        res.json(users);
    });
});
apiRouter.post("/users", function (req, res) {
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
apiRouter.get("/reset", function (req, res) {
    var clearTags = models_1.Tag.remove({});
    var clearPhotos = models_1.Photo.remove({});
    var clearUsers = models_1.User.remove({});
    clearTags.exec();
    clearPhotos.exec();
    clearUsers.exec();
    res.sendStatus(200);
});
app.use("/api/v1", apiRouter);
var server = app.listen(8081, function () {
    console.log("Server started at :%s", server.address().port);
});

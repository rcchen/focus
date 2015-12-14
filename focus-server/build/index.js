var bodyParser = require("body-parser");
var express = require("express");
var models_1 = require("./models");
var app = express();
app.use(bodyParser.json());
app.get('/tags', function (req, res) {
    models_1.Tag.find({}, function (err, tags) {
        res.json(tags);
    });
    ;
});
app.post('/tags', function (req, res) {
    var tag = new models_1.Tag(req.body);
    tag.save(function (err) {
    });
});
var server = app.listen(8080, function () {
    console.log('Server started at :%s', server.address().port);
});

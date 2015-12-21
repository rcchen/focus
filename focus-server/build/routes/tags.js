var express_1 = require('express');
var models_1 = require('../models');
exports.tagsRouter = express_1.Router();
exports.tagsRouter.get("/tags", function (req, res) {
    models_1.Tag.find({}, function (err, tags) {
        res.json(tags);
    });
    ;
});
exports.tagsRouter.post("/tags", function (req, res) {
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

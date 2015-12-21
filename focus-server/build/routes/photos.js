var express_1 = require('express');
var models_1 = require('../models');
exports.photosRouter = express_1.Router();
exports.photosRouter.get("/photos", function (req, res) {
    models_1.Photo.find({}, function (err, photos) {
        if (err) {
            res.json(500, err);
        }
        else {
            res.json(photos);
        }
    });
});
exports.photosRouter.post("/photos", function (req, res) {
});

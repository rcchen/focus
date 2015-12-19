import bodyParser = require("body-parser");
import express = require("express");

import { Tag, Photo, User } from "./models";

const app = express();

app.use(bodyParser.json());

app.get("/tags", (req, res) => {
    Tag.find({}, (err, tags) => {
        res.json(tags);
    });;
});

app.post("/tags", (req, res) => {
    const tag = new Tag(req.body);
    tag.save((err, savedTag) => {
        if (err) {
            res.json(500, err);
        } else {
            res.json(savedTag);
        }
    });
});

app.get("/photos", (req, res) => {
    Photo.find({}, (err, photos) => {
        if (err) {
            res.json(500, err);
        } else {
            res.json(photos);            
        }
    });
});

app.post("/photos", (req, res) => {

});

app.get("/users", (req, res) => {
    User.find({}, (err, users) => {
        res.json(users);
    });
});

app.post("/users", (req, res) => {

});

const server = app.listen(8080, () => {
    console.log("Server started at :%s", server.address().port);
});

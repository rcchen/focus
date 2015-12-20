import bodyParser = require("body-parser");
import bcrypt = require("bcrypt");
import express = require("express");

import { Tag, Photo, User } from "./models";

namespace Focus.Models {
    export interface User {
        email: string;
        password: string;
    }
}

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
    const reqUser = req.body as Focus.Models.User;
    User.findOne({ email: reqUser.email }, (err, user) => {
        if (user) {
            res.sendStatus(500);
        } else {
            bcrypt.hash(reqUser.password, 10, (err, hash) => {
                const newUser = new User({
                    email: reqUser.email,
                    password: hash
                });
                newUser.save((err, savedUser) => {
                    res.json(savedUser);
                });
            });
        }
    });
});

app.get("/reset", (req, res) => {
    const clearTags = Tag.remove({});
    const clearPhotos = Photo.remove({});
    const clearUsers = User.remove({});
    clearTags.exec();
    clearPhotos.exec();
    clearUsers.exec();
    res.sendStatus(200);
});

const server = app.listen(8080, () => {
    console.log("Server started at :%s", server.address().port);
});

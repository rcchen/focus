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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080/");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const apiRouter = express.Router();

apiRouter.get("/tags", (req, res) => {
    Tag.find({}, (err, tags) => {
        res.json(tags);
    });;
});

apiRouter.post("/tags", (req, res) => {
    const tag = new Tag(req.body);
    tag.save((err, savedTag) => {
        if (err) {
            res.json(500, err);
        } else {
            res.json(savedTag);
        }
    });
});

apiRouter.get("/photos", (req, res) => {
    Photo.find({}, (err, photos) => {
        if (err) {
            res.json(500, err);
        } else {
            res.json(photos);
        }
    });
});

apiRouter.post("/photos", (req, res) => {

});

apiRouter.get("/users", (req, res) => {
    User.find({}, (err, users) => {
        res.json(users);
    });
});

apiRouter.post("/users", (req, res) => {
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

apiRouter.get("/reset", (req, res) => {
    const clearTags = Tag.remove({});
    const clearPhotos = Photo.remove({});
    const clearUsers = User.remove({});
    clearTags.exec();
    clearPhotos.exec();
    clearUsers.exec();
    res.sendStatus(200);
});

app.use("/api/v1", apiRouter);

const server = app.listen(8081, () => {
    console.log("Server started at :%s", server.address().port);
});

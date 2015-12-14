import bodyParser = require("body-parser");
import express = require("express");

import { Tag } from "./models";

const app = express();

app.use(bodyParser.json());

app.get('/tags', (req, res) => {
    Tag.find({}, (err, tags) => {
        res.json(tags);
    });;
});

app.post('/tags', (req, res) => {
    const tag = new Tag(req.body);
    tag.save((err) => {

    });
});

const server = app.listen(8080, () => {
    console.log('Server started at :%s', server.address().port);
});

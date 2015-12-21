import { Router } from 'express';
import { Tag } from '../models';

export const tagsRouter = Router();

tagsRouter.get("/tags", (req, res) => {
    Tag.find({}, (err, tags) => {
        res.json(tags);
    });;
});

tagsRouter.post("/tags", (req, res) => {
    const tag = new Tag(req.body);
    tag.save((err, savedTag) => {
        if (err) {
            res.json(500, err);
        } else {
            res.json(savedTag);
        }
    });
});

import { Router } from 'express';

import { Photo } from '../models';

export const photosRouter = Router();

photosRouter.get("/photos", (req, res) => {
    Photo.find({}, (err, photos) => {
        if (err) {
            res.json(500, err);
        } else {
            res.json(photos);
        }
    });
});

photosRouter.post("/photos", (req, res) => {

});

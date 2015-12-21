import { hash } from 'bcrypt';
import { Router } from 'express';

import { FocusUser } from '../interfaces/models.ts';
import { User } from '../models';

export const usersRouter = Router();

usersRouter.get("/users", (req, res) => {
    User.find({}, (err, users) => {
        res.json(users);
    });
});

usersRouter.post("/users", (req, res) => {
    const reqUser = req.body as FocusUser;
    User.findOne({ email: reqUser.email }, (err, user) => {
        if (user) {
            res.sendStatus(500);
        } else {
            hash(reqUser.password, 10, (err, hash) => {
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

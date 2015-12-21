import { hash }  from 'bcrypt';
import { Router } from 'express';

import { FocusUser } from '../interfaces/models';
import { User } from '../models';

export const authRouter = Router();

authRouter.post("/login", (req, res) => {
    const reqUser = req.body as FocusUser;
    User.findOne({ email: reqUser.email }, (err, user: FocusUser) => {
        if (user) {
            hash(reqUser.password, 10, (err, hash) => {
                if (user.password === hash) {
                    
                }
            });
        } else {
            res.sendStatus(401);
        }
    })
});
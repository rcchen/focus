import bodyParser = require("body-parser");
import bcrypt = require("bcrypt");
import cors = require("cors");
import express = require("express");

import { Tag, Photo, User } from "./models";

import { authRouter } from "./routes/auth";
import { photosRouter } from "./routes/photos";
import { tagsRouter } from "./routes/tags";
import { usersRouter } from "./routes/users";

const app = express();

app.use(bodyParser.json());

const corsOptions: cors.CorsOptions = {
    origin: "http://localhost:8080"
};
app.use(cors(corsOptions));

const apiRouter = express.Router();

apiRouter.use(authRouter);
apiRouter.use(photosRouter);
apiRouter.use(tagsRouter);
apiRouter.use(usersRouter);

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

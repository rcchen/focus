var bodyParser = require("body-parser");
var cors = require("cors");
var express = require("express");
var models_1 = require("./models");
var auth_1 = require("./routes/auth");
var photos_1 = require("./routes/photos");
var tags_1 = require("./routes/tags");
var users_1 = require("./routes/users");
var app = express();
app.use(bodyParser.json());
var corsOptions = {
    origin: "http://localhost:8080"
};
app.use(cors(corsOptions));
var apiRouter = express.Router();
apiRouter.use(auth_1.authRouter);
apiRouter.use(photos_1.photosRouter);
apiRouter.use(tags_1.tagsRouter);
apiRouter.use(users_1.usersRouter);
apiRouter.get("/reset", function (req, res) {
    var clearTags = models_1.Tag.remove({});
    var clearPhotos = models_1.Photo.remove({});
    var clearUsers = models_1.User.remove({});
    clearTags.exec();
    clearPhotos.exec();
    clearUsers.exec();
    res.sendStatus(200);
});
app.use("/api/v1", apiRouter);
var server = app.listen(8081, function () {
    console.log("Server started at :%s", server.address().port);
});

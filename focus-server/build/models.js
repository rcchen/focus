var mongoose_1 = require("mongoose");
mongoose_1.connect("mongodb://localhost/test");
var tagSchema = new mongoose_1.Schema({
    name: mongoose_1.Schema.Types.String,
    photos: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Photo"
        }],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    }
});
exports.Tag = mongoose_1.model("Tag", tagSchema);
var photoSchema = new mongoose_1.Schema({
    path: mongoose_1.Schema.Types.String,
    tags: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Tag"
        }],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    }
});
exports.Photo = mongoose_1.model("Photo", photoSchema);
var userSchema = new mongoose_1.Schema({
    email: {
        type: mongoose_1.Schema.Types.String,
        unique: true
    },
    password: mongoose_1.Schema.Types.String,
    photos: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Photo"
        }],
    tags: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Tag"
        }]
});
exports.User = mongoose_1.model("User", userSchema);

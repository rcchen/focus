import { connect, model, Schema } from "mongoose";

// TODO: Add typings for this
const uniqueValidator = require("mongoose-unique-validator");

// Connect to MongoDB
connect("mongodb://localhost/test");

// Define a schema for Tags
const tagSchema = new Schema({
    name: Schema.Types.String,
    photos: [{
        type: Schema.Types.ObjectId,
        ref: "Photo"
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

export const Tag = model("Tag", tagSchema);

// Define a schema for Photos
const photoSchema = new Schema({
    path: Schema.Types.String,
    tags: [{
        type: Schema.Types.ObjectId,
        ref: "Tag"
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

export const Photo = model("Photo", photoSchema);

// Define a schema for Users
const userSchema = new Schema({
    email: {
        type: Schema.Types.String,
        unique: true
    },
    password: Schema.Types.String,
    photos: [{
        type: Schema.Types.ObjectId,
        ref: "Photo"
    }],
    tags: [{
        type: Schema.Types.ObjectId,
        ref: "Tag"
    }]
});
userSchema.plugin(uniqueValidator);

export const User = model("User", userSchema);

import { connect, model, Schema } from 'mongoose';

// Connect to MongoDB
connect("mongodb://localhost/test");

// Define a schema for Tags
const tagSchema = new Schema({
    name: Schema.Types.String
});

export const Tag = model("Tag", tagSchema);

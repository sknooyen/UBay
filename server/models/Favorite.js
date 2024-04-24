const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');

const FavoriteSchema = new mongoose.Schema(
    {
        id: {type: String, default: uuidv4, unique: true},
        title: {type: String, required: true, unique: true},
        category: {type: Array},
        description: {type: String, required: true},
        condition: {type: String, required: true},
        price: {type: Number, required: true},
        imageURL: {type: Array, required: true},
        size: {type: String},
        color: {type: String},
        postDate: {type: String},
        id_email: {type: String, default: "unknown@umass.edu", required: true}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Favorite", FavoriteSchema)
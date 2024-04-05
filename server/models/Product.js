const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
    {
        id: {type: Number, require: true, unique: true},
        title: {type: String, required: true, unique: true},
        category: {type: Array},
        description: {type: String, required: true},
        condition: {type: String, required: true},
        price: {type: Number, required: true},
        imageURL: {type: String, required: true},
        size: {type: String},
        color: {type: String},
        postDate: {type: String}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Product", ProductSchema)
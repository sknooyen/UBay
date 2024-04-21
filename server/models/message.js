const { List } = require("@mui/material");
const mongoose = require("mongoose");
const { v4: uuidv4} = require('uuid');

const MessageSchema = new mongoose.Schema(
    {
        user1: {type: String, required: true},
        user2: {type: String, required: true},
        message_objects: {type: List}
    }
);
module.exports = mongoose.model("Message", MessageSchema)

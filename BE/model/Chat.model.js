const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
    account_id : String,
    content : String,
    deleted : {
        type : Boolean,
        default : false
    },
    deletedAt : Date
},
{
    timestamps : true,
});

const Chat = mongoose.model("Chat",chatSchema, "chats");

module.exports = Chat;
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    chatName: {
      type: "string",
      trim: true,
    },
    isGroup: {
      type: "boolean",
      default: false,
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;

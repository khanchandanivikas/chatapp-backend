const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Sender",
    },
    conversationId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Conversation",
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);

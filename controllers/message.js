const mongoose = require("mongoose");
const { createError } = require("../utils/error");
const Message = require("../models/message");

//new msg
module.exports.getUserMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    return next(createError(500, "There was some unknown error."));
  }
};

//new msg
module.exports.createMessage = async (req, res, next) => {
  const newMessage = new Message(req.body);
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    const savedMessage = await newMessage.save();
    await sess.commitTransaction();
    res.status(200).json(savedMessage);
  } catch (err) {
    return next(createError(500, "There was some unknown error."));
  }
};

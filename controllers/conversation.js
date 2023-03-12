const mongoose = require("mongoose");
import { createError } from "../middlewares/error.js";
const Conversation = require("../models/conversation");

//get conv of a user
export const getUserConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    return next(createError(500, "There was some unknown error."));
  }
};

// get conv includes two userId
export const getUsersConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    return next(createError(500, "There was some unknown error."));
  }
};

//new conv
export const createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    const savedConversation = await newConversation.save();
    await sess.commitTransaction();
    res.status(200).json(savedConversation);
  } catch (err) {
    return next(createError(500, "There was some unknown error."));
  }
};

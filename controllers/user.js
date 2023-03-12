import { createError } from "../middlewares/error.js";
const User = require("../models/user");

export const getUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId, "-password").populate("conversations");
    res.status(200).json(user);
  } catch (err) {
    return next(createError(500, "There was some unknown error."));
  }
};

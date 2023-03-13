const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const cloudinary = require("../utils/cloudinary");
const { createError } = require("../utils/error");
const { validateRequest } = require("../middlewares/validateRequest");
const User = require("../models/user");

module.exports.register = async (req, res, next) => {
  validateRequest(req);
  const { username, email, password } = req.body;
  let existeUser;
  try {
    existeUser = await User.findOne({
      email: email,
    });
  } catch (err) {
    return next(createError(500, "There was an error with the operation."));
  }
  if (existeUser) {
    return next(createError(401, "A user already exists with this e-mail."));
  } else {
    // let result;
    // try {
    //   result = await cloudinary.uploader.upload(req.file.path, {
    //     folder: "chatApp",
    //   });
    //   console.log(result)
    // } catch (err) {
    //   console.log(err);
    //   return next(
    //     createError(500, "There was some error. It was not possible to save the datas.")
    //   );
    // }
    let hashedPassword;
    hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      profilePicture: "testurl",
    });
    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await newUser.save({
        session: sess,
      });
      await sess.commitTransaction();
    } catch (err) {
      console.log(err);
      return next(
        createError(500, "There was some error. It was not possible to save the datas.")
      );
    }
    let token;
    try {
      token = jwt.sign(
        {
          userId: newUser.id,
          email: newUser.email,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
    } catch (err) {
      console.log(err);
      return next(
        createError(500, "There was some error. It was not possible to save the datas.")
      );
    }
    res.status(201).json({
      userId: newUser.id,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      profilePicture: newUser.profilePicture,
      token: token,
    });
  }
};

module.exports.login = async (req, res, next) => {
  validateRequest(req);
  const { email, password } = req.body;
  let userExists;
  try {
    userExists = await User.findOne({ email: email }).populate("conversations");
  } catch (err) {
    return next(
      createError(500, "It was not possible to perform the operation")
    );
  }
  if (!userExists) return next(createError(422, "User not found!"));
  
  let isPasswordCorrect = false;
  try {
    isPasswordCorrect = await bcrypt.compare(password, userExists.password);
  } catch (err) {
    return next(
      createError(500, "It was not possible to realize the login. Revise your credentials.")
    );
  }
  if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));

  let token;
  try {
    token = jwt.sign(
      { userId: userExists._id, isAdmin: userExists.isAdmin },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
  } catch (err) {
    return next(
      createError(500, "It was not possible to realize the login. Revise your credentials.")
    );
  }
  res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .json({
      userId: userExists.id,
      username: userExists.username,
      email: userExists.email,
      profilePicture: userExists.profilePicture,
    });
};

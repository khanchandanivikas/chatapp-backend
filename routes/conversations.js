const express = require("express");
const {
  createConversation,
  getUserConversation,
  getUsersConversation,
} = require("../controllers/conversation");
// const { verifyUser } = require("../middlewares/verifyToken");

const router = express.Router();
//new conv
router.post("/", createConversation);

//get conv of a user
router.get("/:userId", 
// verifyUser, 
getUserConversation);

// get conv includes two userId
router.get(
  "/find/:firstUserId/:secondUserId",
  verifyUser,
  getUsersConversation
);

module.exports = router;

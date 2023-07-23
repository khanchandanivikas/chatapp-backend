const express = require("express");
const { createMessage, getUserMessages } = require("../controllers/message");
// const { verifyUser } = require("../middlewares/verifyToken");

const router = express.Router();
//new msg
router.post("/", createMessage);

//get msgs of a user in a conversation
router.get("/:conversationId", 
// verifyUser, 
getUserMessages);

module.exports = router;

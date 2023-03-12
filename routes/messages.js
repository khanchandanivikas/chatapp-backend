import express from "express";
import {
  createMessage,
  getUserMessages,
} from "../controllers/message.js";
import { verifyUser } from "../middlewares/verifyToken.js";

const router = express.Router();
//new msg
router.post("/", createMessage);

//get msgs of a user in a conversation
router.get("/:conversationId", verifyUser, getUserMessages);

export default router;
import express from "express";
import {
  createMessage,
  getUserMessages,
} from "../controllers/messages.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();
//new conv
router.post("/", createMessage);

//get msgs of a user in a conversation
router.get("/:conversationId", verifyUser, getUserMessages);

export default router;
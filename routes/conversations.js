import express from "express";
import {
  createConversation,
  getUserConversation,
  getUsersConversation,
} from "../controllers/conversation.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();
//new conv
router.post("/", createConversation);

//get conv of a user
router.get("/:userId", verifyUser, getUserConversation);

// get conv includes two userId
router.get("/find/:firstUserId/:secondUserId", verifyUser, getUsersConversation);

export default router;
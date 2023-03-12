import express from "express";
import {
  getUser,
} from "../controllers/users.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//get info of a user
router.get("/:userId", verifyUser, getUser);

export default router;
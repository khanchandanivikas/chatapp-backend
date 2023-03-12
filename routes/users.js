import express from "express";
import {
  getUser,
} from "../controllers/user.js";
import { verifyUser } from "../middlewares/verifyToken.js";

const router = express.Router();

//get info of a user
router.get("/:userId", verifyUser, getUser);

export default router;
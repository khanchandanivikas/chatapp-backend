const express = require("express");
const { getUser } = require("../controllers/user");
const { verifyUser } = require("../middlewares/verifyToken");

const router = express.Router();

//get info of a user
router.get("/:userId", verifyUser, getUser);

module.exports = router;

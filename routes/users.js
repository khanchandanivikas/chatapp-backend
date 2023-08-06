const express = require("express");
const { getUser, getUsers } = require("../controllers/user");
// const { verifyUser } = require("../middlewares/verifyToken");

const router = express.Router();

//get info of a user
router.get("/:userId", 
// verifyUser, 
getUser);

router.get("/", 
// verifyUser, 
getUsers);

module.exports = router;

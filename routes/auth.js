const express = require("express");
const { check } = require("express-validator");
const upload = require("../utils/multer");
const { login, register } = require("../controllers/auth");

const router = express.Router();

router.post(
  "/register",
  upload.single("image"),
  [
    check("userName").not().isEmpty(),
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  register
);
router.post(
  "/login",
  [
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  login
);

module.exports = router;

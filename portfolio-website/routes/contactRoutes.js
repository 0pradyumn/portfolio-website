const express = require("express");
const { body } = require("express-validator");
const { createMessage } = require("../controllers/contactController");

const router = express.Router();

router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }),
    body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
    body("subject").optional().trim().isLength({ max: 200 }),
    body("message").trim().notEmpty().withMessage("Message is required").isLength({ min: 5, max: 2000 }),
  ],
  createMessage
);

module.exports = router;

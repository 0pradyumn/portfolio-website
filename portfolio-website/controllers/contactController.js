const { validationResult } = require("express-validator");
const Contact = require("../models/Contact");
const sendContactEmail = require("../utils/sendEmail");

exports.createMessage = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    // 1. Persist in MongoDB
    const saved = await Contact.create({ name, email, subject, message });

    // 2. Notify via email (server-side service)
    const emailed = await sendContactEmail({ name, email, subject, message });

    res.status(201).json({
      success: true,
      id: saved._id,
      emailed,
      message: emailed
        ? "Message saved and email sent."
        : "Message saved (email service unavailable).",
    });
  } catch (err) {
    next(err);
  }
};

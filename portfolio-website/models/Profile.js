const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: String,
    email: String,
    phone: String,
    location: String,
    avatarUrl: String,
    socials: {
      linkedin: String,
      github: String,
      leetcode: String,
      codeforces: String,
    },
    education: [
      {
        degree: String,
        institution: String,
        period: String,
        score: String,
      },
    ],
    achievements: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);

const Profile = require("../models/Profile");
const Project = require("../models/Project");
const Skill = require("../models/Skill");

// GET /api/portfolio — one payload for the whole page (single round-trip)
exports.getPortfolio = async (req, res, next) => {
  try {
    const [profile, projects, skills] = await Promise.all([
      Profile.findOne().sort({ createdAt: -1 }),
      Project.find().sort({ order: 1 }),
      Skill.find().sort({ order: 1 }),
    ]);
    res.json({ profile, projects, skills });
  } catch (err) {
    next(err);
  }
};

// Individual RESTful resources (still available for admin tooling)
exports.getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne().sort({ createdAt: -1 });
    res.json(profile);
  } catch (err) {
    next(err);
  }
};

exports.getProjects = async (req, res, next) => {
  try {
    res.json(await Project.find().sort({ order: 1 }));
  } catch (err) {
    next(err);
  }
};

exports.getSkills = async (req, res, next) => {
  try {
    res.json(await Skill.find().sort({ order: 1 }));
  } catch (err) {
    next(err);
  }
};

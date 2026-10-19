const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/portfolioController");

router.get("/portfolio", ctrl.getPortfolio);
router.get("/profile", ctrl.getProfile);
router.get("/projects", ctrl.getProjects);
router.get("/skills", ctrl.getSkills);

module.exports = router;

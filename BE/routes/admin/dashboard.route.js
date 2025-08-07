const express = require('express');
const router = express.Router();

const controller = require("../../controllers/admin/dashboard.controller");


router.get("/overview", controller.getOverview);

router.get("/stats", controller.getStats);
router.get("/recent-activities", controller.getRecentActivities);

module.exports = router;

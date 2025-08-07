
const express = require('express');
const router = express.Router();

const AuthRoute = require("./auth.route")
const NewsRoute = require("./news.route")

router.use("/auth", AuthRoute);
router.use("/news", NewsRoute);

module.exports = router;

const express = require('express');
const router = express.Router();

const AuthRoute = require("./auth.route")
const NewsRoute = require("./news.route")
const UserRoute = require("./user.route")

router.use("/auth", AuthRoute);
router.use("/news", NewsRoute);
router.use("/users", UserRoute);

module.exports = router;
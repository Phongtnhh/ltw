
const express = require('express');
const router = express.Router();

const AuthRoute = require("./auth.route");
const NewsRoute = require("./news.route");
const RoleRoute = require("./role.route");
const PermissionRoute = require("./permission.route");
const UserRoute = require("./user.route");

router.use("/auth", AuthRoute);
router.use("/news", NewsRoute);
router.use("/roles", RoleRoute);
router.use("/permissions", PermissionRoute);
router.use("/users", UserRoute);

module.exports = router;
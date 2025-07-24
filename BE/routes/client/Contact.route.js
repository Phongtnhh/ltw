const express = require('express');
const router = express.Router();

const controller = require("../../controllers/client/Contact.controller");

router.get("/", controller.index );

module.exports = router;
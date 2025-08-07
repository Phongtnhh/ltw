const express = require('express');
const router = express.Router();

const controller = require("../../controllers/client/Contact.controller");

// [GET] Contact page data
router.get("/", controller.index);

// [POST] Send contact message
router.post("/send", controller.sendMessage);

module.exports = router;
const express = require('express');
const router = express.Router();

const controller = require("../../controllers/admin/user.controller");

router.get("/stats", controller.getStats);


router.get("/", controller.index);


router.post("/", controller.create);


router.get("/:id", controller.detail);


router.put("/:id", controller.update);


router.delete("/:id", controller.delete);

router.patch("/:id/status", controller.changeStatus);

module.exports = router;

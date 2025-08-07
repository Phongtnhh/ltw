const express = require('express');
const router = express.Router();

const controller = require("../../controllers/admin/role.controller");
const { authenticateToken, requireAdmin } = require("../../middlewares/auth.middleware");

// Áp dụng middleware authentication cho tất cả routes
router.use(authenticateToken);
router.use(requireAdmin);

// [GET] /admin/roles - Lấy danh sách roles
router.get("/", controller.index);

// [GET] /admin/roles/:id - Lấy chi tiết role
router.get("/:id", controller.detail);

// [POST] /admin/roles - Tạo role mới
router.post("/", controller.create);

// [PUT] /admin/roles/:id - Cập nhật role
router.put("/:id", controller.update);

// [DELETE] /admin/roles/:id - Xóa role
router.delete("/:id", controller.delete);

module.exports = router;

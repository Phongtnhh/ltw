const express = require('express');
const router = express.Router();

const controller = require("../../controllers/admin/user.controller");
const { authenticateToken, requirePermission } = require("../../middlewares/auth.middleware");

// Áp dụng middleware authentication cho tất cả routes
router.use(authenticateToken);

// [GET] /admin/users - Lấy danh sách users
router.get("/", requirePermission('users', 'read'), controller.index);

// [GET] /admin/users/:id - Lấy chi tiết user
router.get("/:id", requirePermission('users', 'read'), controller.detail);

// [POST] /admin/users - Tạo user mới
router.post("/", requirePermission('users', 'create'), controller.create);

// [PUT] /admin/users/:id - Cập nhật user
router.put("/:id", requirePermission('users', 'update'), controller.update);

// [DELETE] /admin/users/:id - Xóa user
router.delete("/:id", requirePermission('users', 'delete'), controller.delete);

// [PATCH] /admin/users/:id/status - Thay đổi trạng thái user
router.patch("/:id/status", requirePermission('users', 'update'), controller.changeStatus);

module.exports = router;

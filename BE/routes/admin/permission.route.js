const express = require('express');
const router = express.Router();

const controller = require("../../controllers/admin/permission.controller");
const { authenticateToken, requireAdmin } = require("../../middlewares/auth.middleware");

// Áp dụng middleware authentication cho tất cả routes
router.use(authenticateToken);
router.use(requireAdmin);

// [GET] /admin/permissions/resources - Lấy danh sách resources
router.get("/resources", controller.getResources);

// [GET] /admin/permissions - Lấy danh sách permissions
router.get("/", controller.index);

// [GET] /admin/permissions/:id - Lấy chi tiết permission
router.get("/:id", controller.detail);

// [POST] /admin/permissions - Tạo permission mới
router.post("/", controller.create);

// [PUT] /admin/permissions/:id - Cập nhật permission
router.put("/:id", controller.update);

// [DELETE] /admin/permissions/:id - Xóa permission
router.delete("/:id", controller.delete);

module.exports = router;

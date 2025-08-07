const express = require('express');
const router = express.Router();

const controller = require("../../controllers/admin/news.controller");
const { authenticateToken, requirePermission } = require("../../middlewares/auth.middleware");

// Áp dụng middleware authentication cho tất cả routes
router.use(authenticateToken);

// [GET] Test route
router.get("/test", (req, res) => {
    res.json({ success: true, message: "Admin news API is working!" });
});

// [GET] Lấy danh sách tin tức (có phân trang, filter, search)
router.get("/", requirePermission('news', 'read'), controller.index);

// [POST] Tạo tin tức mới
router.post("/", requirePermission('news', 'create'), controller.uploadImage, controller.create);

// [GET] Lấy chi tiết tin tức
router.get("/:id", requirePermission('news', 'read'), controller.detail);

// [GET] Lấy tin tức để edit
router.get("/:id/edit", requirePermission('news', 'read'), controller.edit);

// [PUT] Cập nhật tin tức
router.put("/:id", requirePermission('news', 'update'), controller.uploadImage, controller.update);

// [DELETE] Xóa tin tức (soft delete)
router.delete("/:id", requirePermission('news', 'delete'), controller.delete);

// [PATCH] Thay đổi trạng thái tin tức
router.patch("/:id/status", requirePermission('news', 'update'), controller.changeStatus);

module.exports = router;

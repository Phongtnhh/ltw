const express = require('express');
const router = express.Router();

const controller = require("../../controllers/admin/news.controller");

// [GET] Test route
router.get("/test", (req, res) => {
    res.json({ success: true, message: "Admin news API is working!" });
});

// [GET] Lấy danh sách tin tức (có phân trang, filter, search)
router.get("/", controller.index);

// [POST] Tạo tin tức mới
router.post("/", controller.uploadImage, controller.create);

// [GET] Lấy chi tiết tin tức
router.get("/:id", controller.detail);

// [GET] Lấy tin tức để edit
router.get("/:id/edit", controller.edit);

// [PUT] Cập nhật tin tức
router.put("/:id", controller.uploadImage, controller.update);

// [DELETE] Xóa tin tức (soft delete)
router.delete("/:id", controller.delete);

// [PATCH] Thay đổi trạng thái tin tức
router.patch("/:id/status", controller.changeStatus);

module.exports = router;

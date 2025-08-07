const Permission = require("../../model/permission.model");

// [GET] /admin/permissions - Lấy danh sách permissions
module.exports.index = async (req, res) => {
    try {
        const permissions = await Permission.find({ deleted: false })
            .sort({ resource: 1, name: 1 });

        res.status(200).json({
            success: true,
            data: permissions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching permissions",
            error: error.message
        });
    }
};

// [GET] /admin/permissions/:id - Lấy chi tiết permission
module.exports.detail = async (req, res) => {
    try {
        const permission = await Permission.findOne({ 
            _id: req.params.id, 
            deleted: false 
        });

        if (!permission) {
            return res.status(404).json({
                success: false,
                message: "Permission not found"
            });
        }

        res.status(200).json({
            success: true,
            data: permission
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching permission",
            error: error.message
        });
    }
};

// [POST] /admin/permissions - Tạo permission mới
module.exports.create = async (req, res) => {
    try {
        const { name, description, resource, actions } = req.body;

        // Kiểm tra permission đã tồn tại
        const existingPermission = await Permission.findOne({ 
            name, 
            deleted: false 
        });
        
        if (existingPermission) {
            return res.status(400).json({
                success: false,
                message: "Permission already exists"
            });
        }

        const newPermission = new Permission({
            name,
            description,
            resource,
            actions
        });

        await newPermission.save();

        res.status(201).json({
            success: true,
            message: "Permission created successfully",
            data: newPermission
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating permission",
            error: error.message
        });
    }
};

// [PUT] /admin/permissions/:id - Cập nhật permission
module.exports.update = async (req, res) => {
    try {
        const { name, description, resource, actions } = req.body;

        const permission = await Permission.findOne({ 
            _id: req.params.id, 
            deleted: false 
        });

        if (!permission) {
            return res.status(404).json({
                success: false,
                message: "Permission not found"
            });
        }

        permission.name = name || permission.name;
        permission.description = description || permission.description;
        permission.resource = resource || permission.resource;
        permission.actions = actions || permission.actions;

        await permission.save();

        res.status(200).json({
            success: true,
            message: "Permission updated successfully",
            data: permission
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating permission",
            error: error.message
        });
    }
};

// [DELETE] /admin/permissions/:id - Xóa permission (soft delete)
module.exports.delete = async (req, res) => {
    try {
        const permission = await Permission.findOne({ 
            _id: req.params.id, 
            deleted: false 
        });

        if (!permission) {
            return res.status(404).json({
                success: false,
                message: "Permission not found"
            });
        }

        permission.deleted = true;
        permission.deletedAt = new Date();
        await permission.save();

        res.status(200).json({
            success: true,
            message: "Permission deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting permission",
            error: error.message
        });
    }
};

// [GET] /admin/permissions/resources - Lấy danh sách resources
module.exports.getResources = async (req, res) => {
    try {
        const resources = await Permission.distinct('resource', { deleted: false });
        
        res.status(200).json({
            success: true,
            data: resources
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching resources",
            error: error.message
        });
    }
};

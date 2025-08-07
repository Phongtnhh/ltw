const Role = require("../../model/role.route");
const Permission = require("../../model/permission.model");

// [GET] /admin/roles - Lấy danh sách roles
module.exports.index = async (req, res) => {
    try {
        const roles = await Role.find({ deleted: false })
            .populate('permissions')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: roles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching roles",
            error: error.message
        });
    }
};

// [GET] /admin/roles/:id - Lấy chi tiết role
module.exports.detail = async (req, res) => {
    try {
        const role = await Role.findOne({ 
            _id: req.params.id, 
            deleted: false 
        }).populate('permissions');

        if (!role) {
            return res.status(404).json({
                success: false,
                message: "Role not found"
            });
        }

        res.status(200).json({
            success: true,
            data: role
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching role",
            error: error.message
        });
    }
};

// [POST] /admin/roles - Tạo role mới
module.exports.create = async (req, res) => {
    try {
        const { title, description, permissions } = req.body;

        // Kiểm tra role đã tồn tại
        const existingRole = await Role.findOne({ title, deleted: false });
        if (existingRole) {
            return res.status(400).json({
                success: false,
                message: "Role already exists"
            });
        }

        // Kiểm tra permissions có tồn tại
        if (permissions && permissions.length > 0) {
            const validPermissions = await Permission.find({
                _id: { $in: permissions },
                deleted: false
            });

            if (validPermissions.length !== permissions.length) {
                return res.status(400).json({
                    success: false,
                    message: "Some permissions are invalid"
                });
            }
        }

        const newRole = new Role({
            title,
            description,
            permissions: permissions || []
        });

        await newRole.save();
        await newRole.populate('permissions');

        res.status(201).json({
            success: true,
            message: "Role created successfully",
            data: newRole
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating role",
            error: error.message
        });
    }
};

// [PUT] /admin/roles/:id - Cập nhật role
module.exports.update = async (req, res) => {
    try {
        const { title, description, permissions } = req.body;

        const role = await Role.findOne({ 
            _id: req.params.id, 
            deleted: false 
        });

        if (!role) {
            return res.status(404).json({
                success: false,
                message: "Role not found"
            });
        }

        // Không cho phép sửa role admin mặc định
        if (role.isDefault && role.title === 'admin') {
            return res.status(400).json({
                success: false,
                message: "Cannot modify default admin role"
            });
        }

        // Kiểm tra permissions có tồn tại
        if (permissions && permissions.length > 0) {
            const validPermissions = await Permission.find({
                _id: { $in: permissions },
                deleted: false
            });

            if (validPermissions.length !== permissions.length) {
                return res.status(400).json({
                    success: false,
                    message: "Some permissions are invalid"
                });
            }
        }

        role.title = title || role.title;
        role.description = description || role.description;
        role.permissions = permissions || role.permissions;

        await role.save();
        await role.populate('permissions');

        res.status(200).json({
            success: true,
            message: "Role updated successfully",
            data: role
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating role",
            error: error.message
        });
    }
};

// [DELETE] /admin/roles/:id - Xóa role (soft delete)
module.exports.delete = async (req, res) => {
    try {
        const role = await Role.findOne({ 
            _id: req.params.id, 
            deleted: false 
        });

        if (!role) {
            return res.status(404).json({
                success: false,
                message: "Role not found"
            });
        }

        // Không cho phép xóa role admin mặc định
        if (role.isDefault) {
            return res.status(400).json({
                success: false,
                message: "Cannot delete default role"
            });
        }

        role.deleted = true;
        role.deletedAt = new Date();
        await role.save();

        res.status(200).json({
            success: true,
            message: "Role deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting role",
            error: error.message
        });
    }
};

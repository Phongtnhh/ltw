const Account = require("../../model/account.model");
const Role = require("../../model/role.route");
const bcrypt = require("bcrypt");

// [GET] /admin/users - Lấy danh sách users
module.exports.index = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "", role = "" } = req.query;
        
        const filter = { deleted: false };
        
        // Tìm kiếm theo tên hoặc email
        if (search) {
            filter.$or = [
                { fullName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        // Lọc theo role
        if (role) {
            const roleObj = await Role.findOne({ title: role, deleted: false });
            if (roleObj) {
                filter.role = roleObj._id;
            }
        }

        const skip = (page - 1) * limit;
        
        const users = await Account.find(filter)
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Account.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: {
                users,
                pagination: {
                    current: parseInt(page),
                    total: Math.ceil(total / limit),
                    count: users.length,
                    totalRecords: total
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching users",
            error: error.message
        });
    }
};

// [GET] /admin/users/:id - Lấy chi tiết user
module.exports.detail = async (req, res) => {
    try {
        const user = await Account.findOne({ 
            _id: req.params.id, 
            deleted: false 
        }).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching user",
            error: error.message
        });
    }
};

// [POST] /admin/users - Tạo user mới
module.exports.create = async (req, res) => {
    try {
        const { fullName, email, password, phone, roleId, status } = req.body;

        // Kiểm tra email đã tồn tại
        const existingUser = await Account.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Kiểm tra role có tồn tại
        const role = await Role.findById(roleId);
        if (!role || role.deleted) {
            return res.status(400).json({
                success: false,
                message: "Invalid role"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Account({
            fullName,
            email,
            password: hashedPassword,
            phone,
            role: roleId,
            status: status || 'active'
        });

        await newUser.save();
        
        // Lấy user với thông tin role đã populate
        const createdUser = await Account.findById(newUser._id).select('-password');

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: createdUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating user",
            error: error.message
        });
    }
};

// [PUT] /admin/users/:id - Cập nhật user
module.exports.update = async (req, res) => {
    try {
        const { fullName, email, phone, roleId, status } = req.body;

        const user = await Account.findOne({ 
            _id: req.params.id, 
            deleted: false 
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Kiểm tra email đã tồn tại (nếu thay đổi email)
        if (email && email !== user.email) {
            const existingUser = await Account.findOne({ email, _id: { $ne: user._id } });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists"
                });
            }
        }

        // Kiểm tra role có tồn tại (nếu thay đổi role)
        if (roleId) {
            const role = await Role.findById(roleId);
            if (!role || role.deleted) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid role"
                });
            }
        }

        // Cập nhật thông tin
        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.role = roleId || user.role;
        user.status = status || user.status;

        await user.save();

        // Lấy user với thông tin role đã populate
        const updatedUser = await Account.findById(user._id).select('-password');

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating user",
            error: error.message
        });
    }
};

// [DELETE] /admin/users/:id - Xóa user (soft delete)
module.exports.delete = async (req, res) => {
    try {
        const user = await Account.findOne({ 
            _id: req.params.id, 
            deleted: false 
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Không cho phép xóa chính mình
        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: "Cannot delete your own account"
            });
        }

        user.deleted = true;
        user.deletedAt = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting user",
            error: error.message
        });
    }
};

// [PATCH] /admin/users/:id/status - Thay đổi trạng thái user
module.exports.changeStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!['active', 'inactive', 'suspended'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        const user = await Account.findOne({ 
            _id: req.params.id, 
            deleted: false 
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Không cho phép thay đổi trạng thái chính mình
        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: "Cannot change your own status"
            });
        }

        user.status = status;
        await user.save();

        res.status(200).json({
            success: true,
            message: "User status updated successfully",
            data: { status: user.status }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating user status",
            error: error.message
        });
    }
};

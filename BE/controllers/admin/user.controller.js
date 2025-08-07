const Account = require("../../model/account.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// [GET] /admin/users - Lấy danh sách người dùng với phân trang và tìm kiếm
module.exports.index = async (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
            search = '', 
            role = '', 
            status = '' 
        } = req.query;

        // Tạo filter object
        const filter = { deleted: false };
        
        if (search) {
            filter.$or = [
                { fullName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }
        
        if (role) {
            filter.role_id = role;
        }
        
        if (status) {
            filter.status = status;
        }

        // Tính toán pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        // Lấy dữ liệu với pagination
        const users = await Account.find(filter)
            .select('-password') // Không trả về password
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        // Đếm tổng số records
        const total = await Account.countDocuments(filter);
        const totalPages = Math.ceil(total / parseInt(limit));

        res.status(200).json({
            success: true,
            data: {
                users,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages,
                    totalUsers: total,
                    hasNext: parseInt(page) < totalPages,
                    hasPrev: parseInt(page) > 1
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi server khi lấy danh sách người dùng",
            error: error.message
        });
    }
};

// [GET] /admin/users/:id - Lấy thông tin chi tiết một người dùng
module.exports.detail = async (req, res) => {
    try {
        const { id } = req.params;
        
        const user = await Account.findOne({ 
            _id: id, 
            deleted: false 
        }).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy người dùng"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi server khi lấy thông tin người dùng",
            error: error.message
        });
    }
};

// [POST] /admin/users - Tạo người dùng mới
module.exports.create = async (req, res) => {
    try {
        const { fullName, email, password, phone, role_id = "user", status = "active" } = req.body;

        // Kiểm tra email đã tồn tại
        const existingUser = await Account.findOne({ email, deleted: false });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email đã được sử dụng"
            });
        }

        // Mã hóa password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo user mới
        const newUser = new Account({
            fullName,
            email,
            password: hashedPassword,
            phone,
            role_id,
            status
        });

        await newUser.save();

        // Trả về thông tin user (không có password)
        const userResponse = await Account.findById(newUser._id).select('-password');

        res.status(201).json({
            success: true,
            message: "Tạo người dùng thành công",
            data: userResponse
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi server khi tạo người dùng",
            error: error.message
        });
    }
};

// [PUT] /admin/users/:id - Cập nhật thông tin người dùng
module.exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, email, phone, role_id, status, password } = req.body;

        // Kiểm tra user tồn tại
        const user = await Account.findOne({ _id: id, deleted: false });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy người dùng"
            });
        }

        // Kiểm tra email trùng (nếu thay đổi email)
        if (email && email !== user.email) {
            const existingUser = await Account.findOne({ 
                email, 
                deleted: false, 
                _id: { $ne: id } 
            });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "Email đã được sử dụng"
                });
            }
        }

        // Chuẩn bị dữ liệu cập nhật
        const updateData = {};
        if (fullName) updateData.fullName = fullName;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;
        if (role_id) updateData.role_id = role_id;
        if (status) updateData.status = status;

        // Nếu có password mới, mã hóa nó
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        // Cập nhật user
        const updatedUser = await Account.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).select('-password');

        res.status(200).json({
            success: true,
            message: "Cập nhật người dùng thành công",
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi server khi cập nhật người dùng",
            error: error.message
        });
    }
};

// [DELETE] /admin/users/:id - Xóa người dùng (soft delete)
module.exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra user tồn tại
        const user = await Account.findOne({ _id: id, deleted: false });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy người dùng"
            });
        }

        // Soft delete
        await Account.findByIdAndUpdate(id, {
            deleted: true,
            deletedAt: new Date()
        });

        res.status(200).json({
            success: true,
            message: "Xóa người dùng thành công"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi server khi xóa người dùng",
            error: error.message
        });
    }
};

// [PATCH] /admin/users/:id/status - Thay đổi trạng thái người dùng
module.exports.changeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Kiểm tra status hợp lệ
        if (!['active', 'inactive'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Trạng thái không hợp lệ. Chỉ chấp nhận 'active' hoặc 'inactive'"
            });
        }

        // Kiểm tra user tồn tại
        const user = await Account.findOne({ _id: id, deleted: false });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy người dùng"
            });
        }

        // Cập nhật trạng thái
        const updatedUser = await Account.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).select('-password');

        res.status(200).json({
            success: true,
            message: `${status === 'active' ? 'Kích hoạt' : 'Vô hiệu hóa'} người dùng thành công`,
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi server khi thay đổi trạng thái người dùng",
            error: error.message
        });
    }
};

// [GET] /admin/users/stats - Lấy thống kê người dùng
module.exports.getStats = async (req, res) => {
    try {
        const totalUsers = await Account.countDocuments({ deleted: false });
        const activeUsers = await Account.countDocuments({ deleted: false, status: 'active' });
        const inactiveUsers = await Account.countDocuments({ deleted: false, status: 'inactive' });

        // Thống kê theo role
        const roleStats = await Account.aggregate([
            { $match: { deleted: false } },
            { $group: { _id: '$role_id', count: { $sum: 1 } } }
        ]);

        // Thống kê người dùng mới trong 30 ngày qua
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const newUsersLast30Days = await Account.countDocuments({
            deleted: false,
            createdAt: { $gte: thirtyDaysAgo }
        });

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                activeUsers,
                inactiveUsers,
                newUsersLast30Days,
                roleStats
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi server khi lấy thống kê người dùng",
            error: error.message
        });
    }
};

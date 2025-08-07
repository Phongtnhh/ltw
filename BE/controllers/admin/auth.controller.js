const Account = require("../../model/account.model");
const Role = require("../../model/role.route");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};


// Dang ki
module.exports.register = async (req, res) => {
    const { fullName, email, password, phone, roleId } = req.body;

    try {
        const existingUser = await Account.findOne({ email });
        if (existingUser) return res.status(400).json({
            success: false,
            message: "Email already exists"
        });

        // Lấy role mặc định nếu không có roleId
        let role;
        if (roleId) {
            role = await Role.findById(roleId);
            if (!role) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid role"
                });
            }
        } else {
            // Lấy role user mặc định
            role = await Role.findOne({ title: 'user', deleted: false });
            if (!role) {
                return res.status(400).json({
                    success: false,
                    message: "Default user role not found"
                });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Account({
            fullName,
            email,
            password: hashedPassword,
            phone,
            role: role._id,
            status: "active"
        });

        await newUser.save();
        res.status(201).json({
            success: true,
            message: "Register successful"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};


// Dang nhap
module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Account.findOne({ email });
        if (!user || user.deleted) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.status !== 'active') {
            return res.status(401).json({
                success: false,
                message: "Account is not active"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Cập nhật lastLogin
        user.lastLogin = new Date();
        await user.save();

        const token = generateToken(user);

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                status: user.status,
                lastLogin: user.lastLogin
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};


// Dang xuat
module.exports.logout = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};

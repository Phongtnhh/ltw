const jwt = require("jsonwebtoken");
const Account = require("../model/account.model");
require("dotenv").config();

// Middleware xác thực JWT token
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Access token is required" 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Lấy thông tin user từ database
        const user = await Account.findById(decoded.id);
        if (!user || user.deleted) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid token or user not found" 
            });
        }

        if (user.status !== 'active') {
            return res.status(401).json({ 
                success: false, 
                message: "Account is not active" 
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ 
            success: false, 
            message: "Invalid or expired token" 
        });
    }
};

// Middleware kiểm tra quyền admin
const requireAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ 
            success: false, 
            message: "Authentication required" 
        });
    }

    if (!req.user.role || req.user.role.title !== 'admin') {
        return res.status(403).json({ 
            success: false, 
            message: "Admin access required" 
        });
    }

    next();
};

// Middleware kiểm tra quyền theo resource và action
const requirePermission = (resource, action) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ 
                success: false, 
                message: "Authentication required" 
            });
        }

        // Admin có tất cả quyền
        if (req.user.role && req.user.role.title === 'admin') {
            return next();
        }

        // Kiểm tra permissions
        if (!req.user.role || !req.user.role.permissions) {
            return res.status(403).json({ 
                success: false, 
                message: "No permissions assigned" 
            });
        }

        const hasPermission = req.user.role.permissions.some(permission => {
            return permission.resource === resource && 
                   (permission.actions.includes(action) || permission.actions.includes('manage'));
        });

        if (!hasPermission) {
            return res.status(403).json({ 
                success: false, 
                message: `Permission denied for ${action} on ${resource}` 
            });
        }

        next();
    };
};

// Middleware kiểm tra role
const requireRole = (roleName) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ 
                success: false, 
                message: "Authentication required" 
            });
        }

        if (!req.user.role || req.user.role.title !== roleName) {
            return res.status(403).json({ 
                success: false, 
                message: `Role ${roleName} required` 
            });
        }

        next();
    };
};

module.exports = {
    authenticateToken,
    requireAdmin,
    requirePermission,
    requireRole
};
